import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, ReferenceLine,
  ReferenceArea, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useStore } from '../state/store';
import { CAPACITY_THRESHOLD, INTENT_THRESHOLD } from '../engine/score';
import { Card, RagBadge, QuadrantChip, SegmentTag, RAG_COLOR, QUADRANT_LABEL } from '../components/ui';
import { formatLakh, pct } from '../lib/format';
import type { Quadrant, ScoredProspect } from '../data/types';

const QUAD_ORDER: Record<Quadrant, number> = {
  'convert-now': 0, 'build-intent': 1, 'nurture-capacity': 2, 'deprioritize': 3,
};

function Kpi({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <Card className="px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-bold" style={{ color: accent ?? '#0f172a' }}>{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </Card>
  );
}

export function Cockpit() {
  const { scored, report } = useStore();
  const nav = useNavigate();
  const [quadFilter, setQuadFilter] = useState<Quadrant | 'all'>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    let list = scored.slice();
    if (quadFilter !== 'all') list = list.filter((s) => s.quadrant === quadFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((s) =>
        s.prospect.name.toLowerCase().includes(q) || s.prospect.id.toLowerCase().includes(q));
    }
    return list.sort((a, b) =>
      QUAD_ORDER[a.quadrant] - QUAD_ORDER[b.quadrant] ||
      (b.capacityScore + b.intentScore) - (a.capacityScore + a.intentScore) ||
      a.intent.decayDaysLeft - b.intent.decayDaysLeft);
  }, [scored, quadFilter, query]);

  const scatterData = scored.map((s) => ({
    x: s.capacityScore, y: s.intentScore, z: 1,
    id: s.prospect.id, name: s.prospect.name, rag: s.rag,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Officer Cockpit</h1>
        <p className="text-sm text-slate-500">
          {report.n} prospects scored on repayment capacity × genuine intent — prioritized for conversion.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Kpi label="Prospects scored" value={String(report.n)} sub="synthetic sandbox pool" />
        <Kpi label="Convert-Now leads" value={String(report.qualifiedLeads)}
          sub="top-right quadrant" accent="#16a34a" />
        <Kpi label="Lead quality" value={pct(report.aerConversion)}
          sub="genuine converts in bucket" accent="#0c7c6d" />
        <Kpi label="Conversion lift" value={report.lift.toFixed(1) + '×'}
          sub="vs. undifferentiated calling" accent="#ee7623" />
        <Kpi label="Officer effort saved" value={pct(1 - report.qualifiedLeads / report.n)}
          sub="list de-prioritized" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Quadrant scatter */}
        <Card className="lg:col-span-3 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">Conversion-Ready Quadrant</h2>
            <span className="text-xs text-slate-400">click a prospect to inspect</span>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 24, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef2f1" />
              <ReferenceArea x1={CAPACITY_THRESHOLD} y1={INTENT_THRESHOLD} x2={100} y2={100}
                fill="#16a34a" fillOpacity={0.06} />
              <XAxis type="number" dataKey="x" name="Capacity" domain={[0, 100]}
                tick={{ fontSize: 11 }} label={{ value: 'Repayment Capacity →', position: 'bottom', fontSize: 11, fill: '#64748b' }} />
              <YAxis type="number" dataKey="y" name="Intent" domain={[0, 100]}
                tick={{ fontSize: 11 }} label={{ value: 'Intent Heat →', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#64748b' }} />
              <ZAxis type="number" dataKey="z" range={[70, 70]} />
              <ReferenceLine x={CAPACITY_THRESHOLD} stroke="#cbd5e1" />
              <ReferenceLine y={INTENT_THRESHOLD} stroke="#cbd5e1" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) =>
                  active && payload && payload.length ? (
                    <div className="rounded-md bg-white px-2 py-1 text-xs shadow ring-1 ring-slate-200">
                      <div className="font-semibold text-slate-700">{payload[0].payload.name}</div>
                      <div className="text-slate-500">Capacity {payload[0].payload.x} · Intent {payload[0].payload.y}</div>
                    </div>
                  ) : null} />
              <Scatter data={scatterData} isAnimationActive={false}
                onClick={(d) => { const id = (d as unknown as { id?: string }).id; if (id) nav(`/prospect/${id}`); }}
                className="cursor-pointer">
                {scatterData.map((d) => (
                  <Cell key={d.id} fill={RAG_COLOR[d.rag]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="mt-1 grid grid-cols-2 gap-1 text-[11px] text-slate-500">
            <span>↗ <b className="text-emerald-700">Convert Now</b> — call today</span>
            <span>↖ <b className="text-sky-700">Nurture Capacity</b> — offer right-sized amount</span>
            <span>↘ <b className="text-amber-700">Build Intent</b> — warm up / re-market</span>
            <span>↙ <b className="text-slate-500">Deprioritize</b> — no active push</span>
          </div>
        </Card>

        {/* Quadrant distribution */}
        <Card className="lg:col-span-2 p-4">
          <h2 className="mb-3 text-sm font-semibold text-slate-700">Pipeline distribution</h2>
          <div className="space-y-3">
            {(Object.keys(QUAD_ORDER) as Quadrant[]).map((q) => {
              const count = report.quadrantCounts[q] || 0;
              const width = pct(count / report.n);
              return (
                <button key={q} onClick={() => setQuadFilter(quadFilter === q ? 'all' : q)}
                  className={`w-full text-left ${quadFilter === q ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}>
                  <div className="flex items-center justify-between text-xs">
                    <QuadrantChip q={q} />
                    <span className="font-semibold text-slate-600">{count}</span>
                  </div>
                  <div className="mt-1 h-2 w-full rounded bg-slate-100">
                    <div className="h-2 rounded"
                      style={{ width, background: q === 'convert-now' ? '#16a34a' : q === 'deprioritize' ? '#cbd5e1' : '#f59e0b' }} />
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-4 rounded-lg bg-teal-800/5 p-3 text-xs text-teal-900">
            <b>Human-in-the-loop:</b> AER ranks and explains — the loan officer approves,
            rejects or snoozes every lead. No automated lending decision.
          </p>
        </Card>
      </div>

      {/* Queue */}
      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-slate-700">Prospect queue</h2>
            {quadFilter !== 'all' && (
              <button onClick={() => setQuadFilter('all')}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-200">
                {QUADRANT_LABEL[quadFilter]} ✕
              </button>
            )}
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or ID…"
            className="w-56 rounded-md border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-teal-600" />
        </div>
        <div className="max-h-[460px] overflow-y-auto thin-scroll">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-2 font-medium">Prospect</th>
                <th className="px-4 py-2 font-medium">Segment</th>
                <th className="px-4 py-2 font-medium">Interest</th>
                <th className="px-4 py-2 font-medium text-right">Capacity</th>
                <th className="px-4 py-2 font-medium text-right">Intent</th>
                <th className="px-4 py-2 font-medium">Act by</th>
                <th className="px-4 py-2 font-medium">Bucket</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => <QueueRow key={s.prospect.id} s={s} onClick={() => nav(`/prospect/${s.prospect.id}`)} />)}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function QueueRow({ s, onClick }: { s: ScoredProspect; onClick: () => void }) {
  const { decisions } = useStore();
  const d = decisions[s.prospect.id];
  return (
    <tr onClick={onClick} className="cursor-pointer border-t border-slate-50 hover:bg-teal-800/[0.03]">
      <td className="px-4 py-2.5">
        <div className="font-medium text-slate-800">{s.prospect.name}</div>
        <div className="text-xs text-slate-400">{s.prospect.id} · {s.prospect.city}</div>
      </td>
      <td className="px-4 py-2.5"><SegmentTag segment={s.prospect.segment} /></td>
      <td className="px-4 py-2.5">
        <div className="text-slate-700">{s.prospect.interest}</div>
        <div className="text-xs text-slate-400">{formatLakh(s.prospect.requestedAmount)}</div>
      </td>
      <td className="px-4 py-2.5 text-right font-semibold text-slate-700">{s.capacityScore}</td>
      <td className="px-4 py-2.5 text-right font-semibold text-slate-700">{s.intentScore}</td>
      <td className="px-4 py-2.5">
        {s.intent.decayDaysLeft > 0
          ? <span className={s.intent.decayDaysLeft <= 4 ? 'text-rose-600 font-medium' : 'text-slate-600'}>{s.intent.decayDaysLeft}d</span>
          : <span className="text-slate-300">—</span>}
      </td>
      <td className="px-4 py-2.5"><RagBadge rag={s.rag} /></td>
      <td className="px-4 py-2.5">
        {d ? <span className="text-xs font-medium capitalize text-slate-500">{d}</span>
          : <span className="text-xs text-slate-300">pending</span>}
      </td>
    </tr>
  );
}
