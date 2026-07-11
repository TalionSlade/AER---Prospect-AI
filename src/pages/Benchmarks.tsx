import { useStore } from '../state/store';
import { Card, BRAND, StatBox } from '../components/ui';
import { pct } from '../lib/format';
import type { ClassMetrics } from '../engine/benchmark';

function MetricPill({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0' }}>
      <div style={{ fontSize: 22, fontWeight: 900, color, fontFamily: "'Montserrat', sans-serif" }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: BRAND.muted, marginTop: 4, fontFamily: "'Montserrat', sans-serif" }}>{label}</div>
    </div>
  );
}

function ConfusionMatrix({ m }: { m: ClassMetrics }) {
  const Cell = ({ n, label, type }: { n: number; label: string; type: 'tp'|'fp'|'fn'|'tn' }) => {
    const cfg = {
      tp: { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' },
      tn: { bg: BRAND.greenPale, border: BRAND.border, color: BRAND.greenDark },
      fp: { bg: '#fef2f2', border: '#fecaca', color: '#b91c1c' },
      fn: { bg: '#fffbeb', border: '#fde68a', color: '#b45309' },
    }[type];
    return (
      <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 8, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 24, fontWeight: 900, color: cfg.color, fontFamily: "'Montserrat', sans-serif" }}>{n}</div>
        <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: cfg.color, opacity: 0.8, marginTop: 4, fontFamily: "'Montserrat', sans-serif" }}>{label}</div>
      </div>
    );
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: BRAND.muted, marginBottom: 12, fontFamily: "'Montserrat', sans-serif" }}>Confusion Matrix</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Cell n={m.tp} label="True Pos"  type="tp" />
        <Cell n={m.fp} label="False Pos" type="fp" />
        <Cell n={m.fn} label="False Neg" type="fn" />
        <Cell n={m.tn} label="True Neg"  type="tn" />
      </div>
    </div>
  );
}

function ModelCard({ title, subtitle, m }: { title: string; subtitle: string; m: ClassMetrics }) {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>{title}</h2>
        <p style={{ margin: '4px 0 0', fontSize: 11, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif" }}>{subtitle}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, paddingBottom: 20, borderBottom: `1px solid ${BRAND.border}` }}>
        <MetricPill label="Accuracy"  value={pct(m.accuracy, 1)}  color={BRAND.green} />
        <MetricPill label="Precision" value={pct(m.precision, 1)} color={BRAND.green} />
        <MetricPill label="Recall"    value={pct(m.recall, 1)}    color={BRAND.muted} />
        <MetricPill label="F1 Score"  value={pct(m.f1, 1)}        color={BRAND.muted} />
      </div>
      <ConfusionMatrix m={m} />
    </Card>
  );
}

function FunnelBar({ label, fill, color, note }: { label: string; fill: number; color: string; note: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, fontFamily: "'Montserrat', sans-serif" }}>
        <span style={{ fontWeight: 600, color: BRAND.text }}>{label}</span>
        <span style={{ color: BRAND.muted }}>{note}</span>
      </div>
      <div style={{ height: 28, width: '100%', background: '#eee', borderRadius: 6, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${Math.max(12, fill * 100)}%`, background: color,
          display: 'flex', alignItems: 'center', paddingLeft: 12,
          color: '#fff', fontSize: 12, fontWeight: 800, fontFamily: "'Montserrat', sans-serif"
        }}>
          {pct(fill, 0)}
        </div>
      </div>
    </div>
  );
}

export function Benchmarks() {
  const { report } = useStore();

  return (
    <div className="aer-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>Model Benchmarks</h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif" }}>
            Computed live from the engine over {report.n} synthetic prospects with hidden ground-truth labels.
          </p>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: BRAND.green, background: BRAND.greenPale, border: `1px solid ${BRAND.border}`, padding: '6px 14px', borderRadius: 4, fontFamily: "'Montserrat', sans-serif" }}>
          Held-out labels · Fixed seed 2026
        </div>
      </div>

      {/* Classifier cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        <ModelCard
          title="Repayment-Capacity Classifier"
          subtitle="Predicts genuine repayment reliability from behavioural cash-flow signals."
          m={report.capacity}
        />
        <ModelCard
          title="Genuine-Intent Classifier"
          subtitle="Separates real buyers from window-shoppers via digital-footprint signals."
          m={report.intent}
        />
      </div>

      {/* Conversion impact */}
      <Card style={{ padding: 24 }}>
        <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: BRAND.text, marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>Conversion Impact</h2>
        <p style={{ margin: '0 0 24px', fontSize: 11, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif", maxWidth: 800 }}>
          IDBI's status quo is ~1% conversion on undifferentiated leads. AER concentrates officer
          effort on the Convert-Now bucket, dramatically raising quality.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          <StatBox label="Baseline Pool Quality" value={pct(report.baselineConversion, 1)} color={BRAND.text} />
          <StatBox label="Convert-Now Quality"   value={pct(report.aerConversion, 1)} color={BRAND.green} />
          <StatBox label="Conversion Lift"       value={report.lift.toFixed(1) + '×'} color={BRAND.orange} />
          <StatBox label="Qualified Leads"       value={String(report.qualifiedLeads)} color={BRAND.green} />
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: BRAND.muted, marginBottom: 12, fontFamily: "'Montserrat', sans-serif" }}>
            Where officer time goes — Today vs. with AER
          </div>
          <FunnelBar label="Today — call everyone" fill={report.baselineConversion} color="#94a3b8" note="~1% real-world conversion" />
          <FunnelBar label="AER — call Convert-Now first" fill={report.aerConversion} color={BRAND.green} note={`${pct(report.aerConversion, 0)} of contacts are quality`} />
        </div>
      </Card>

      {/* Methodology note */}
      <div style={{ background: BRAND.canvas, border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 16, fontSize: 11, color: BRAND.muted, lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif" }}>
        <strong style={{ color: BRAND.greenDark }}>Methodology:</strong> Each synthetic prospect is
        generated from latent <em>discipline</em> and <em>intent</em> traits that set the hidden labels.
        Observable transactions and digital footprint are derived from those traits with noise. The engine
        sees only the observables — providing honest hold-out metrics akin to production model validation.
      </div>
    </div>
  );
}
