import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../state/store';
import { Card, RagBadge, QuadrantChip, SegmentTag, ScoreDial, ContribBar, StatBox, BRAND } from '../components/ui';
import { formatINR, formatLakh, pct } from '../lib/format';
import type { ScoredProspect } from '../data/types';

export function ProspectDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { byId, decisions, decide } = useStore();
  const s = id ? byId(id) : undefined;

  if (!s) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 250, color: '#888', fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{ fontSize: 16, fontWeight: 600 }}>Prospect not found.</div>
      <button onClick={() => nav('/')} style={{ marginTop: 12, background: 'none', border: 'none', color: BRAND.green, fontWeight: 600, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}>
        ← Back to Cockpit
      </button>
    </div>
  );

  const ragGradient: Record<string, string> = {
    green: 'linear-gradient(135deg, #16a34a, #15803d)',
    amber: 'linear-gradient(135deg, #f59e0b, #d97706)',
    red:   'linear-gradient(135deg, #ef4444, #b91c1c)',
  };

  const decision = decisions[s.prospect.id];

  return (
    <div className="aer-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Breadcrumb */}
      <button onClick={() => nav('/')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: BRAND.green, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: "'Montserrat', sans-serif" }}>
        ← Back to Cockpit
      </button>

      {/* Hero Header */}
      <Card style={{ overflow: 'hidden', padding: 0 }}>
        <div style={{ background: ragGradient[s.rag], padding: '20px 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Avatar */}
              <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                {s.prospect.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: '#fff', fontFamily: "'Montserrat', sans-serif", letterSpacing: '-0.5px' }}>{s.prospect.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.9)', fontFamily: "'Montserrat', sans-serif" }}>
                  <span style={{ fontWeight: 600 }}>{s.prospect.id}</span>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>{s.prospect.age} yrs</span>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>{s.prospect.city}</span>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>{s.prospect.tenureMonthsWithBank}mo IDBI</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RagBadge rag={s.rag} />
                <QuadrantChip q={s.quadrant} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: "'Montserrat', sans-serif" }}>Loan Enquiry</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginTop: 2, fontFamily: "'Montserrat', sans-serif" }}>{s.prospect.interest}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 2, fontFamily: "'Montserrat', sans-serif" }}>Req: {formatLakh(s.prospect.requestedAmount)}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Info strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 24px', background: BRAND.canvas, borderTop: `1px solid ${BRAND.border}` }}>
          <SegmentTag segment={s.prospect.segment} />
          {s.intent.isWindowShopper && (
            <span style={{ padding: '2px 8px', borderRadius: 4, background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a', fontSize: 11, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>
              Window Shopper
            </span>
          )}
          {s.fraud.level !== 'clear' && (
            <span style={{ padding: '2px 8px', borderRadius: 4, background: s.fraud.level === 'high' ? '#fef2f2' : '#fffbeb', color: s.fraud.level === 'high' ? '#b91c1c' : '#b45309', border: `1px solid ${s.fraud.level === 'high' ? '#fecaca' : '#fde68a'}`, fontSize: 11, fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>
              {s.fraud.level === 'high' ? 'High Risk' : 'Needs Review'}
            </span>
          )}
          <span style={{ marginLeft: 'auto', fontSize: 10, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
            Scored by 11-agent AER pipeline · DPDP compliant
          </span>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20 }}>
        {/* LEFT column — capacity story */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Score + SHAP contributions */}
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
              <div style={{ display: 'flex', gap: 24 }}>
                <ScoreDial value={s.capacityScore} label="Capacity" color={BRAND.green} />
                <ScoreDial value={s.intentScore}   label="Intent"   color={BRAND.orange} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>Score Drivers (SHAP)</div>
                  <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2, fontFamily: "'Montserrat', sans-serif" }}>Feature contributions to capacity score</div>
                </div>
                <div>
                  {s.contributions.map((c) => (
                    <ContribBar key={c.feature} label={c.feature} detail={c.detail} impact={c.impact} />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Affordability & Cashflow */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: BRAND.text, marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>
                Affordability Envelope
              </div>
              <div style={{ fontSize: 11, color: BRAND.muted, marginBottom: 16, fontFamily: "'Montserrat', sans-serif", lineHeight: 1.4 }}>
                Max EMI sustainable without delinquency.
              </div>
              <EnvelopeBar s={s} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 20 }}>
                <StatBox label="Survivable" value={formatINR(s.affordability.survivableEmi)} color={BRAND.green} />
                <StatBox label="Requested"  value={formatINR(s.affordability.requestedEmi)} />
                <StatBox
                  label="Headroom"
                  value={(s.affordability.headroom >= 0 ? '+' : '') + formatINR(s.affordability.headroom)}
                  color={s.affordability.headroom >= 0 ? BRAND.sigGreen : BRAND.sigRed}
                />
              </div>
            </Card>

            <Card style={{ padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: BRAND.text, marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>
                Cash-Flow Read
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ padding: '2px 8px', borderRadius: 4, background: BRAND.greenPale, color: BRAND.green, border: `1px solid ${BRAND.border}`, fontSize: 11, fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>
                  Est. Inc: {formatINR(s.income.monthlyIncome)}/mo
                </span>
                <span style={{ fontSize: 11, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif" }}>Conf: {pct(s.income.confidence)}</span>
              </div>
              <div style={{ fontSize: 10, color: BRAND.light, fontStyle: 'italic', marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>{s.income.method}</div>
              <CashflowBar s={s} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 18 }}>
                <StatBox label="Savings" value={pct(s.cashflow.savingsRate)} color={BRAND.sigGreen} />
                <StatBox label="Wants"   value={pct(s.cashflow.wantsRatio)} />
                <StatBox label="Free/mo" value={formatINR(s.cashflow.disposable)} />
              </div>
            </Card>
          </div>

          {/* Statement sample */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: BRAND.text, marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>
              Statement Sample <span style={{ textTransform: 'none', fontWeight: 500, color: BRAND.light }}>(recent 12 of {s.prospect.transactions.length} txns)</span>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: "'Montserrat', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: BRAND.muted, textTransform: 'uppercase' }}>Date</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: BRAND.muted, textTransform: 'uppercase' }}>Merchant</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: BRAND.muted, textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '8px 12px', textAlign: 'right', fontSize: 10, fontWeight: 600, color: BRAND.muted, textTransform: 'uppercase' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {s.prospect.transactions.slice(0, 12).map((t, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                      <td style={{ padding: '8px 12px', color: BRAND.muted, fontSize: 11 }}>{t.date}</td>
                      <td style={{ padding: '8px 12px', color: BRAND.text, fontWeight: 500 }}>{t.merchant}</td>
                      <td style={{ padding: '8px 12px' }}><CatTag cat={t.category} /></td>
                      <td style={{ padding: '8px 12px', textAlign: 'right', fontWeight: 600, color: t.direction === 'credit' ? BRAND.sigGreen : BRAND.text }}>
                        {t.direction === 'credit' ? '+' : '−'}{formatINR(t.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* RIGHT column — intent, fraud, copilot */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Intent & Timing */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: BRAND.text, marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>
              Intent & Timing
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, fontFamily: "'Montserrat', sans-serif" }}>
                <span style={{ color: BRAND.muted, fontWeight: 500 }}>Engagement Heat</span>
                <span style={{ fontWeight: 800, color: BRAND.text }}>{s.intent.heat}/100</span>
              </div>
              <div style={{ height: 6, width: '100%', background: '#eee', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${s.intent.heat}%`,
                  background: s.intent.heat >= 70 ? BRAND.orange : s.intent.heat >= 40 ? BRAND.yellow : '#ccc',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 6, marginBottom: 16, background: s.intent.decayDaysLeft <= 0 ? '#f5f5f5' : s.intent.decayDaysLeft <= 4 ? '#fef2f2' : '#fffbeb', border: `1px solid ${s.intent.decayDaysLeft <= 0 ? '#eee' : s.intent.decayDaysLeft <= 4 ? '#fecaca' : '#fde68a'}` }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif" }}>Act-by Window</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: s.intent.decayDaysLeft <= 0 ? BRAND.light : s.intent.decayDaysLeft <= 4 ? BRAND.sigRed : '#b45309', fontFamily: "'Montserrat', sans-serif" }}>
                {s.intent.decayDaysLeft > 0 ? `${s.intent.decayDaysLeft} days` : 'Cooled'}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <Signal on={!s.intent.isWindowShopper} label={s.intent.isWindowShopper ? 'Window-shopper' : 'Genuine intent'} />
              <Signal on={s.prospect.sessions.some(x => x.emiCalculatorUsed)} label="EMI calc used" />
              <Signal on={s.prospect.sessions.some(x => x.applicationStarted)} label="App started" />
              <Signal on={s.prospect.sessions.some(x => x.documentsUploaded)} label="Docs uploaded" />
              <Signal on label={`${s.prospect.sessions.length} sessions`} />
            </div>
          </Card>

          {/* Fraud / Anomaly */}
          <Card style={{ padding: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: BRAND.text, marginBottom: 12, fontFamily: "'Montserrat', sans-serif" }}>
              Anomaly Screen
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 6, background: s.fraud.level === 'clear' ? '#f0fdf4' : s.fraud.level === 'high' ? '#fef2f2' : '#fffbeb', border: `1px solid ${s.fraud.level === 'clear' ? '#bbf7d0' : s.fraud.level === 'high' ? '#fecaca' : '#fde68a'}` }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: s.fraud.level === 'clear' ? BRAND.sigGreen : s.fraud.level === 'high' ? BRAND.sigRed : '#b45309', fontFamily: "'Montserrat', sans-serif" }}>
                {s.fraud.level === 'clear' ? 'Clear — No Anomalies' : s.fraud.level === 'high' ? 'High Risk' : 'Needs Review'}
              </span>
            </div>
            {s.fraud.reasons.length > 0 && (
              <ul style={{ margin: '12px 0 0', paddingLeft: 16, color: BRAND.muted, fontSize: 11, fontFamily: "'Montserrat', sans-serif" }}>
                {s.fraud.reasons.map(r => <li key={r} style={{ marginBottom: 4 }}>{r}</li>)}
              </ul>
            )}
          </Card>

          {/* Loan Officer Co-Pilot */}
          <Card style={{ padding: 20, border: `2px solid ${BRAND.greenLight}`, boxShadow: `0 4px 20px rgba(0,131,108,0.12)` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: BRAND.greenDark, fontFamily: "'Montserrat', sans-serif" }}>Loan-Officer Co-Pilot</h2>
              <span style={{ fontSize: 9, fontWeight: 700, color: BRAND.green, background: BRAND.greenPale, padding: '2px 6px', borderRadius: 4, border: `1px solid ${BRAND.border}`, textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>AI-assisted</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <Row k="Recommend" v={s.recommendation.product} />
              <Row k="Eligible"  v={formatLakh(s.recommendation.eligibleAmount)} />
              <Row k="EMI"       v={formatINR(s.recommendation.suggestedEmi) + '/mo'} />
              <Row k="Best time" v={s.recommendation.bestTimeToCall} />
            </div>

            <div style={{ background: '#f8fafc', padding: 12, borderRadius: 6, border: '1px dashed #cbd5e1', marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: BRAND.muted, textTransform: 'uppercase', marginBottom: 6, fontFamily: "'Montserrat', sans-serif" }}>Call Script</div>
              <div style={{ fontSize: 11, color: BRAND.text, fontStyle: 'italic', lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif" }}>"{s.recommendation.callScript}"</div>
            </div>

            <div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => decide(s.prospect.id, 'approved')} className="btn-idbi-primary" style={{ flex: 1, background: decision === 'approved' ? BRAND.greenDark : BRAND.green, opacity: decision && decision !== 'approved' ? 0.5 : 1 }}>Approve</button>
                <button onClick={() => decide(s.prospect.id, 'snoozed')} className="btn-idbi-orange" style={{ flex: 1, background: decision === 'snoozed' ? BRAND.yellow : '#f8fafc', color: decision === 'snoozed' ? '#fff' : BRAND.text, borderColor: decision === 'snoozed' ? BRAND.yellow : BRAND.border, opacity: decision && decision !== 'snoozed' ? 0.5 : 1 }}>Snooze</button>
                <button onClick={() => decide(s.prospect.id, 'rejected')} className="btn-idbi-orange" style={{ flex: 1, background: decision === 'rejected' ? BRAND.sigRed : '#f8fafc', color: decision === 'rejected' ? '#fff' : BRAND.text, borderColor: decision === 'rejected' ? BRAND.sigRed : BRAND.border, opacity: decision && decision !== 'rejected' ? 0.5 : 1 }}>Reject</button>
              </div>
              {decision && (
                <div style={{ marginTop: 12, textAlign: 'center', fontSize: 10, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                  Officer decision recorded: <b style={{ textTransform: 'capitalize', color: BRAND.text }}>{decision}</b>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f5f5f5', paddingBottom: 6 }}>
      <span style={{ fontSize: 11, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>{k}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>{v}</span>
    </div>
  );
}

function Signal({ on, label }: { on: boolean; label: string }) {
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 600, fontFamily: "'Montserrat', sans-serif",
      background: on ? BRAND.greenPale : '#f5f5f5',
      color: on ? BRAND.green : '#aaa',
      border: `1px solid ${on ? BRAND.border : '#eee'}`,
      textDecoration: on ? 'none' : 'line-through'
    }}>
      {label}
    </span>
  );
}

function CatTag({ cat }: { cat: string }) {
  const map: Record<string, { bg: string, color: string, border: string }> = {
    income:     { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    obligation: { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
    need:       { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
    want:       { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    savings:    { bg: BRAND.greenPale, color: BRAND.green, border: BRAND.border },
    transfer:   { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
  };
  const c = map[cat] || map.transfer;
  return (
    <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 9, fontWeight: 600, background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontFamily: "'Montserrat', sans-serif", textTransform: 'uppercase' }}>
      {cat}
    </span>
  );
}

function EnvelopeBar({ s }: { s: ScoredProspect }) {
  const max = Math.max(s.affordability.survivableEmi, s.affordability.requestedEmi) * 1.1 || 1;
  const survW = (s.affordability.survivableEmi / max) * 100;
  const reqW  = (s.affordability.requestedEmi  / max) * 100;
  
  const vColor = s.affordability.verdict === 'comfortable' ? BRAND.sigGreen : s.affordability.verdict === 'stretch' ? BRAND.sigAmber : BRAND.sigRed;
  const vBg    = s.affordability.verdict === 'comfortable' ? '#f0fdf4' : s.affordability.verdict === 'stretch' ? '#fffbeb' : '#fef2f2';
  const vBord  = s.affordability.verdict === 'comfortable' ? '#bbf7d0' : s.affordability.verdict === 'stretch' ? '#fde68a' : '#fecaca';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>
          <span style={{ color: BRAND.muted, fontWeight: 500 }}>Survivable EMI</span>
          <span style={{ fontWeight: 700, color: BRAND.green }}>{formatINR(s.affordability.survivableEmi)}</span>
        </div>
        <div style={{ height: 8, width: '100%', background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${survW}%`, background: BRAND.green }} />
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>
          <span style={{ color: BRAND.muted, fontWeight: 500 }}>Requested EMI</span>
          <span style={{ fontWeight: 700, color: BRAND.text }}>{formatINR(s.affordability.requestedEmi)}</span>
        </div>
        <div style={{ height: 8, width: '100%', background: '#eee', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${reqW}%`, background: vColor }} />
        </div>
      </div>
      <div style={{ alignSelf: 'flex-start', padding: '3px 10px', borderRadius: 6, background: vBg, color: vColor, border: `1px solid ${vBord}`, fontSize: 11, fontWeight: 700, textTransform: 'capitalize', fontFamily: "'Montserrat', sans-serif" }}>
        {s.affordability.verdict}
      </div>
    </div>
  );
}

function CashflowBar({ s }: { s: ScoredProspect }) {
  const inc  = s.cashflow.income || 1;
  const seg  = (v: number) => Math.max(0, (v / inc) * 100);
  const free = Math.max(0, inc - s.cashflow.obligations - s.cashflow.needs - s.cashflow.wants - s.cashflow.savings);
  const parts = [
    { label: 'Obligations', v: s.cashflow.obligations, c: BRAND.sigRed },
    { label: 'Needs',       v: s.cashflow.needs,        c: '#0ea5e9' },
    { label: 'Wants',       v: s.cashflow.wants,        c: BRAND.sigAmber },
    { label: 'Savings',     v: s.cashflow.savings,      c: BRAND.sigGreen },
    { label: 'Free cash',   v: free,                    c: '#cbd5e1' },
  ];
  return (
    <div>
      <div style={{ display: 'flex', height: 16, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
        {parts.map(p => <div key={p.label} style={{ width: `${seg(p.v)}%`, background: p.c }} title={`${p.label}: ${formatINR(p.v)}`} />)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginTop: 12 }}>
        {parts.map(p => (
          <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.c }} />
            <span style={{ fontSize: 10, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>{p.label}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>{formatINR(p.v)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
