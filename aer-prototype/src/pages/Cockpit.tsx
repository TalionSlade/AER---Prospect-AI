import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, ReferenceLine,
  ReferenceArea, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useStore } from '../state/store';
import { CAPACITY_THRESHOLD, INTENT_THRESHOLD } from '../engine/score';
import { Card, RagBadge, SegmentTag, RAG_COLOR, QUADRANT_LABEL } from '../components/ui';
import { formatLakh, pct } from '../lib/format';
import type { Quadrant, ScoredProspect } from '../data/types';

const QUAD_ORDER: Record<Quadrant, number> = {
  'convert-now': 0, 'build-intent': 1, 'nurture-capacity': 2, 'deprioritize': 3,
};

interface QuadMeta { label: string; hint: string; color: string; tint: string; arrow: string }
const QUAD_META: Record<Quadrant, QuadMeta> = {
  'convert-now': { label: 'Convert Now', hint: 'Call today', color: '#16a34a', tint: 'bg-emerald-50', arrow: '↗' },
  'nurture-capacity': { label: 'Nurture Capacity', hint: 'Offer right-sized amount', color: '#0ea5e9', tint: 'bg-sky-50', arrow: '↖' },
  'build-intent': { label: 'Build Intent', hint: 'Warm up / re-market', color: '#f59e0b', tint: 'bg-amber-50', arrow: '↘' },
  'deprioritize': { label: 'Deprioritize', hint: 'No active push', color: '#94a3b8', tint: 'bg-slate-100', arrow: '↙' },
};
// Grid order mirrors the Capacity×Intent scatter: high-intent row on top,
// high-capacity column on the right.
const QUAD_GRID: Quadrant[] = ['nurture-capacity', 'convert-now', 'deprioritize', 'build-intent'];

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
          <p className="mt-1 text-[11px] text-slate-400">
            Shaded zone = <b className="text-emerald-700">Convert-Now</b> (capacity ≥ {CAPACITY_THRESHOLD} &amp; intent ≥ {INTENT_THRESHOLD}).
            Dot colour = RAG priority. Quadrant tiles at right act as queue filters.
          </p>
        </Card>

        {/* Quadrant filter matrix — tiles positioned to mirror the scatter */}
        <Card className="lg:col-span-2 p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-700">Pipeline quadrants</h2>
              <p className="text-[11px] text-slate-400">Tap a tile to filter the queue</p>
            </div>
            {quadFilter !== 'all' && (
              <button onClick={() => setQuadFilter('all')}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:bg-slate-200">
                Clear filter ✕
              </button>
            )}
          </div>

          {/* axis-labelled 2×2 grid */}
          <div className="flex gap-1.5">
            <div className="flex items-center">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-300"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Intent →</span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-2">
                {QUAD_GRID.map((q) => (
                  <QuadTile key={q} q={q} count={report.quadrantCounts[q] || 0} total={report.n}
                    active={quadFilter === q} anyActive={quadFilter !== 'all'}
                    onClick={() => setQuadFilter(quadFilter === q ? 'all' : q)} />
                ))}
              </div>
              <div className="mt-1 text-right text-[9px] font-semibold uppercase tracking-wider text-slate-300">Capacity →</div>
            </div>
          </div>

          <p className="mt-3 rounded-lg bg-teal-800/5 p-3 text-xs text-teal-900">
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

function QuadTile({ q, count, total, active, anyActive, onClick }: {
  q: Quadrant; count: number; total: number; active: boolean; anyActive: boolean; onClick: () => void;
}) {
  const m = QUAD_META[q];
  const share = total ? count / total : 0;
  return (
    <button onClick={onClick}
      className={[
        'relative flex flex-col rounded-xl p-3 text-left transition-all duration-150',
        active ? `${m.tint} shadow-sm`
          : anyActive ? 'bg-white ring-1 ring-slate-200 opacity-50 hover:opacity-100'
            : 'bg-white ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-md',
      ].join(' ')}
      style={active ? { boxShadow: `0 0 0 2px ${m.color}` } : undefined}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg text-sm font-bold text-white"
          style={{ background: m.color }}>{m.arrow}</span>
        <span className="text-3xl font-extrabold leading-none" style={{ color: m.color }}>{count}</span>
      </div>
      <div className="mt-2 text-[13px] font-semibold text-slate-800">{m.label}</div>
      <div className="text-[11px] text-slate-400">{m.hint}</div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
        <div className="h-1.5 rounded-full" style={{ width: pct(share), background: m.color }} />
      </div>
      <div className="mt-1 text-[10px] font-medium text-slate-400">{pct(share)} of pipeline</div>
    </button>
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
