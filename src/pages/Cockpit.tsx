import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
  ReferenceLine, ReferenceArea, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useStore } from '../state/store';
import { CAPACITY_THRESHOLD, INTENT_THRESHOLD } from '../engine/score';
import { Card, RagBadge, SegmentTag, MiniBar, BRAND, RAG_COLOR, QUADRANT_LABEL } from '../components/ui';
import { formatLakh, pct } from '../lib/format';
import type { Quadrant, ScoredProspect } from '../data/types';

const QUAD_ORDER: Record<Quadrant, number> = {
  'convert-now': 0, 'build-intent': 1, 'nurture-capacity': 2, 'deprioritize': 3,
};

const QUAD_META: Record<Quadrant, { label: string; hint: string; color: string; pale: string; icon: string }> = {
  'convert-now':      { label: 'Convert Now',     hint: 'Call today',             color: '#16a34a', pale: '#f0fdf4', icon: '🎯' },
  'nurture-capacity': { label: 'Nurture Capacity', hint: 'Right-size the offer',   color: '#0ea5e9', pale: '#f0f9ff', icon: '🌱' },
  'build-intent':     { label: 'Build Intent',     hint: 'Re-market first',        color: '#f59e0b', pale: '#fffbeb', icon: '📣' },
  'deprioritize':     { label: 'Deprioritize',     hint: 'No active push needed',  color: '#94a3b8', pale: '#f8fafc', icon: '⏸' },
};
const QUAD_GRID: Quadrant[] = ['nurture-capacity', 'convert-now', 'deprioritize', 'build-intent'];

// ── KPI card ─────────────────────────────────────────────────────────
function Kpi({ label, value, sub, stripClass }: { label: string; value: string; sub: string; stripClass: string }) {
  return (
    <Card className={`${stripClass} p-4`} style={{ borderRadius: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#888', fontFamily: "'Montserrat', sans-serif" }}>
        {label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 900, color: '#111', margin: '6px 0 2px', fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: '#999', fontFamily: "'Montserrat', sans-serif" }}>{sub}</div>
    </Card>
  );
}

// ── Cockpit ──────────────────────────────────────────────────────────
export function Cockpit() {
  const { scored, report } = useStore();
  const nav = useNavigate();
  const [quadFilter, setQuadFilter] = useState<Quadrant | 'all'>('all');
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    let list = scored.slice();
    if (quadFilter !== 'all') list = list.filter(s => s.quadrant === quadFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(s => s.prospect.name.toLowerCase().includes(q) || s.prospect.id.toLowerCase().includes(q));
    }
    return list.sort((a, b) =>
      QUAD_ORDER[a.quadrant] - QUAD_ORDER[b.quadrant] ||
      (b.capacityScore + b.intentScore) - (a.capacityScore + a.intentScore) ||
      a.intent.decayDaysLeft - b.intent.decayDaysLeft
    );
  }, [scored, quadFilter, query]);

  const scatter = scored.map(s => ({ x: s.capacityScore, y: s.intentScore, z: 1, id: s.prospect.id, name: s.prospect.name, rag: s.rag }));

  return (
    <div className="aer-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Page title */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: '#111', fontFamily: "'Montserrat', sans-serif" }}>
            Officer Cockpit
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888', fontFamily: "'Montserrat', sans-serif" }}>
            {report.n} prospects scored — ranked by repayment capacity × genuine intent
          </p>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: BRAND.green, fontFamily: "'Montserrat', sans-serif", padding: '6px 14px', background: BRAND.greenPale, borderRadius: 4, border: `1px solid ${BRAND.border}` }}>
          Synthetic sandbox · Seed 2026
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        <Kpi label="Prospects Scored"   value={String(report.n)}                           sub="in sandbox"          stripClass="kpi-strip-slate" />
        <Kpi label="Convert-Now Leads"  value={String(report.qualifiedLeads)}               sub="ready to call"       stripClass="kpi-strip-green" />
        <Kpi label="Lead Quality"       value={pct(report.aerConversion)}                   sub="genuine in bucket"   stripClass="kpi-strip-green" />
        <Kpi label="Conversion Lift"    value={`${report.lift.toFixed(1)}×`}                sub="vs undifferentiated" stripClass="kpi-strip-orange" />
        <Kpi label="Effort Saved"       value={pct(1 - report.qualifiedLeads / report.n)}   sub="de-prioritised"      stripClass="kpi-strip-slate" />
      </div>

      {/* Scatter + Quadrant tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
        {/* Scatter */}
        <Card className="p-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#222', fontFamily: "'Montserrat', sans-serif" }}>Conversion-Ready Quadrant</div>
              <div style={{ fontSize: 11, color: '#999', fontFamily: "'Montserrat', sans-serif", marginTop: 2 }}>Click a dot to inspect the prospect</div>
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#999', fontFamily: "'Montserrat', sans-serif", alignItems: 'center' }}>
              {[{ c: '#16a34a', l: 'Green' }, { c: '#f59e0b', l: 'Amber' }, { c: '#dc2626', l: 'Red' }].map(r => (
                <span key={r.l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: r.c, display: 'inline-block' }} />{r.l}
                </span>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 8, right: 16, bottom: 24, left: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#f0f0f0" />
              <ReferenceArea x1={CAPACITY_THRESHOLD} y1={INTENT_THRESHOLD} x2={100} y2={100} fill="#00836c" fillOpacity={0.06} />
              <XAxis type="number" dataKey="x" name="Capacity" domain={[0,100]}
                tick={{ fontSize: 10, fill: '#aaa', fontFamily: 'Montserrat, sans-serif' }}
                label={{ value: 'Repayment Capacity →', position: 'bottom', fontSize: 10, fill: '#aaa', fontFamily: 'Montserrat, sans-serif', offset: 10 }}
                axisLine={{ stroke: '#eee' }} tickLine={false} />
              <YAxis type="number" dataKey="y" name="Intent" domain={[0,100]}
                tick={{ fontSize: 10, fill: '#aaa', fontFamily: 'Montserrat, sans-serif' }}
                label={{ value: 'Intent Heat →', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#aaa', fontFamily: 'Montserrat, sans-serif', offset: 8 }}
                axisLine={{ stroke: '#eee' }} tickLine={false} />
              <ZAxis type="number" dataKey="z" range={[72, 72]} />
              <ReferenceLine x={CAPACITY_THRESHOLD} stroke="#ddd" strokeDasharray="4 3" />
              <ReferenceLine y={INTENT_THRESHOLD}   stroke="#ddd" strokeDasharray="4 3" />
              <Tooltip
                cursor={false}
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div style={{ background: '#fff', border: '1px solid #e0e8e6', borderRadius: 6, padding: '8px 12px', fontFamily: 'Montserrat, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      <div style={{ fontWeight: 700, fontSize: 12, color: '#222' }}>{payload[0].payload.name}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Capacity {payload[0].payload.x} · Intent {payload[0].payload.y}</div>
                    </div>
                  ) : null}
              />
              <Scatter
                data={scatter} isAnimationActive={false} className="cursor-pointer"
                onClick={d => { const id = (d as unknown as { id?: string }).id; if (id) nav(`/prospect/${id}`); }}
              >
                {scatter.map(d => (
                  <Cell key={d.id} fill={RAG_COLOR[d.rag]} fillOpacity={0.8} stroke={RAG_COLOR[d.rag]} strokeWidth={0.5} strokeOpacity={0.4} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        {/* Quadrant tiles */}
        <Card className="p-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#222', fontFamily: "'Montserrat', sans-serif" }}>Pipeline Quadrants</div>
              <div style={{ fontSize: 11, color: '#999', fontFamily: "'Montserrat', sans-serif", marginTop: 2 }}>Filter the queue by quadrant</div>
            </div>
            {quadFilter !== 'all' && (
              <button onClick={() => setQuadFilter('all')} style={{ fontSize: 11, fontWeight: 600, color: '#888', background: '#f5f5f5', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}>
                Clear ✕
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 8, fontWeight: 700, color: '#ccc', writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>
                Intent →
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {QUAD_GRID.map(q => (
                  <QuadTile key={q} q={q} count={report.quadrantCounts[q] || 0} total={report.n}
                    active={quadFilter === q} anyActive={quadFilter !== 'all'}
                    onClick={() => setQuadFilter(quadFilter === q ? 'all' : q)} />
                ))}
              </div>
              <div style={{ textAlign: 'right', fontSize: 8, fontWeight: 700, color: '#ccc', marginTop: 6, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>
                Capacity →
              </div>
            </div>
          </div>

          {/* HITL notice */}
          <div style={{ marginTop: 12, background: BRAND.greenPale, border: `1px solid ${BRAND.border}`, borderRadius: 6, padding: '10px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: BRAND.green, fontFamily: "'Montserrat', sans-serif", lineHeight: 1.5 }}>
              <strong>Human-in-the-Loop:</strong> AER scores and explains every lead. The loan officer approves, rejects, or snoozes. No automated lending decision.
            </div>
          </div>
        </Card>
      </div>

      {/* Queue */}
      <Card className="overflow-hidden">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#222', fontFamily: "'Montserrat', sans-serif" }}>Prospect Queue</span>
            <span style={{ background: '#f0f0f0', borderRadius: 20, padding: '1px 8px', fontSize: 11, fontWeight: 700, color: '#666', fontFamily: "'Montserrat', sans-serif" }}>{rows.length}</span>
            {quadFilter !== 'all' && (
              <button onClick={() => setQuadFilter('all')} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: BRAND.green, background: BRAND.greenPale, border: `1px solid ${BRAND.border}`, borderRadius: 4, padding: '3px 10px', cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}>
                {QUADRANT_LABEL[quadFilter]} ✕
              </button>
            )}
          </div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name or ID…"
            style={{ width: 220, padding: '7px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 12, fontFamily: "'Montserrat', sans-serif", outline: 'none', color: '#333' }}
          />
        </div>

        <div style={{ maxHeight: 500, overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: "'Montserrat', sans-serif" }}>
            <thead style={{ position: 'sticky', top: 0, background: '#fafafa', zIndex: 1 }}>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                {['#', 'Prospect', 'Segment', 'Product', 'Capacity', 'Intent', 'Act By', 'Priority', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#999', letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif", whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((s, i) => (
                <QueueRow key={s.prospect.id} s={s} rank={i + 1} onClick={() => nav(`/prospect/${s.prospect.id}`)} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ── Quadrant Tile ─────────────────────────────────────────────────────
function QuadTile({ q, count, total, active, anyActive, onClick }: {
  q: Quadrant; count: number; total: number; active: boolean; anyActive: boolean; onClick: () => void;
}) {
  const m = QUAD_META[q];
  const share = total ? count / total : 0;
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? m.pale : '#fff',
        border: active ? `1.5px solid ${m.color}` : '1px solid #e8e8e8',
        borderRadius: 8,
        padding: '10px 12px',
        textAlign: 'left',
        cursor: 'pointer',
        opacity: !active && anyActive ? 0.45 : 1,
        transition: 'all 0.15s',
        display: 'block', width: '100%',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 16 }}>{m.icon}</span>
        <span style={{ fontSize: 26, fontWeight: 900, color: m.color, lineHeight: 1, fontFamily: "'Montserrat', sans-serif" }}>{count}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#222', marginTop: 6, fontFamily: "'Montserrat', sans-serif" }}>{m.label}</div>
      <div style={{ fontSize: 10, color: '#999', fontFamily: "'Montserrat', sans-serif", marginTop: 1 }}>{m.hint}</div>
      <div style={{ marginTop: 8, height: 3, width: '100%', background: '#eee', borderRadius: 2 }}>
        <div style={{ height: 3, width: pct(share), background: m.color, borderRadius: 2, transition: 'width 0.4s' }} />
      </div>
      <div style={{ fontSize: 9, color: '#bbb', marginTop: 3, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{pct(share)} of pipeline</div>
    </button>
  );
}

// ── Queue Row ─────────────────────────────────────────────────────────
function QueueRow({ s, rank, onClick }: { s: ScoredProspect; rank: number; onClick: () => void }) {
  const { decisions } = useStore();
  const d = decisions[s.prospect.id];
  const urgent = s.intent.decayDaysLeft > 0 && s.intent.decayDaysLeft <= 4;

  return (
    <tr onClick={onClick} className="queue-row" style={{ borderBottom: '1px solid #f5f5f5' }}>
      {/* Rank */}
      <td style={{ padding: '10px 14px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 24, height: 24, borderRadius: '50%',
          background: rank <= 3 ? BRAND.green : '#eee',
          color: rank <= 3 ? '#fff' : '#888',
          fontSize: 10, fontWeight: 800, fontFamily: "'Montserrat', sans-serif",
        }}>{rank}</span>
      </td>
      {/* Name */}
      <td style={{ padding: '10px 14px' }}>
        <div style={{ fontWeight: 700, color: '#222', fontSize: 12, fontFamily: "'Montserrat', sans-serif" }}>{s.prospect.name}</div>
        <div style={{ fontSize: 10, color: '#aaa', fontFamily: "'Montserrat', sans-serif" }}>{s.prospect.id} · {s.prospect.city}</div>
      </td>
      {/* Segment */}
      <td style={{ padding: '10px 14px' }}><SegmentTag segment={s.prospect.segment} /></td>
      {/* Product */}
      <td style={{ padding: '10px 14px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#444', fontFamily: "'Montserrat', sans-serif" }}>{s.prospect.interest}</div>
        <div style={{ fontSize: 10, color: '#aaa', fontFamily: "'Montserrat', sans-serif" }}>{formatLakh(s.prospect.requestedAmount)}</div>
      </td>
      {/* Capacity */}
      <td style={{ padding: '10px 14px' }}><MiniBar value={s.capacityScore} color={BRAND.green} /></td>
      {/* Intent */}
      <td style={{ padding: '10px 14px' }}><MiniBar value={s.intentScore} color={BRAND.orange} /></td>
      {/* Act by */}
      <td style={{ padding: '10px 14px' }}>
        {s.intent.decayDaysLeft > 0
          ? <span style={{ fontSize: 11, fontWeight: 700, color: urgent ? '#dc2626' : '#555', fontFamily: "'Montserrat', sans-serif", background: urgent ? '#fef2f2' : '#f5f5f5', padding: '2px 7px', borderRadius: 3 }}>
              {s.intent.decayDaysLeft}d
            </span>
          : <span style={{ color: '#ccc', fontSize: 11 }}>—</span>
        }
      </td>
      {/* RAG */}
      <td style={{ padding: '10px 14px' }}><RagBadge rag={s.rag} /></td>
      {/* Decision */}
      <td style={{ padding: '10px 14px' }}>
        {d
          ? <span style={{ fontSize: 11, fontWeight: 600, color: '#555', fontFamily: "'Montserrat', sans-serif", textTransform: 'capitalize' }}>{d}</span>
          : <span style={{ fontSize: 11, color: '#ccc', fontFamily: "'Montserrat', sans-serif" }}>—</span>
        }
      </td>
    </tr>
  );
}
