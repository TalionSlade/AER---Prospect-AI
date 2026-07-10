import { useStore } from '../state/store';
import { Card } from '../components/ui';
import { pct } from '../lib/format';
import type { ClassMetrics } from '../engine/benchmark';

function MetricRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-50 py-1.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-semibold" style={{ color: accent ?? '#0f172a' }}>{value}</span>
    </div>
  );
}

function Confusion({ m }: { m: ClassMetrics }) {
  const cell = (n: number, label: string, good: boolean) => (
    <div className={`rounded-md p-2 text-center ${good ? 'bg-emerald-50' : 'bg-rose-50'}`}>
      <div className="text-lg font-bold text-slate-800">{n}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-400">{label}</div>
    </div>
  );
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {cell(m.tp, 'True Pos', true)}
      {cell(m.fp, 'False Pos', false)}
      {cell(m.fn, 'False Neg', false)}
      {cell(m.tn, 'True Neg', true)}
    </div>
  );
}

function ModelCard({ title, subtitle, m }: { title: string; subtitle: string; m: ClassMetrics }) {
  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-slate-700">{title}</h2>
      <p className="text-xs text-slate-500">{subtitle}</p>
      <div className="mt-3">
        <MetricRow label="Accuracy" value={pct(m.accuracy, 1)} accent="#0c7c6d" />
        <MetricRow label="Precision" value={pct(m.precision, 1)} accent="#0c7c6d" />
        <MetricRow label="Recall" value={pct(m.recall, 1)} />
        <MetricRow label="F1 score" value={pct(m.f1, 1)} />
      </div>
      <Confusion m={m} />
    </Card>
  );
}

export function Benchmarks() {
  const { report } = useStore();
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Model Benchmarks</h1>
        <p className="text-sm text-slate-500">
          Computed live from the engine over {report.n} synthetic prospects carrying hidden ground-truth
          labels (held-out). No number here is hand-set — reload changes nothing, the seed is fixed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ModelCard title="Repayment-Capacity classifier"
          subtitle="Predicts genuine repayment reliability from behavioural cash-flow signals."
          m={report.capacity} />
        <ModelCard title="Genuine-Intent classifier"
          subtitle="Separates real buyers from window-shoppers via digital-footprint signals."
          m={report.intent} />
      </div>

      <Card className="p-5">
        <h2 className="text-sm font-semibold text-slate-700">Conversion impact</h2>
        <p className="text-xs text-slate-500">
          The bank's status quo is ~1% conversion on undifferentiated leads. AER concentrates officer
          effort on the Convert-Now bucket.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Big label="Baseline pool quality" value={pct(report.baselineConversion, 1)} sub="genuine converts across all leads" />
          <Big label="Convert-Now quality" value={pct(report.aerConversion, 1)} sub="genuine converts in AER bucket" accent="#16a34a" />
          <Big label="Conversion lift" value={report.lift.toFixed(1) + '×'} sub="vs. calling the whole list" accent="#ee7623" />
          <Big label="Qualified leads" value={String(report.qualifiedLeads)} sub={`of ${report.n} surfaced for action`} />
        </div>
        <div className="mt-5">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Where officer time goes today vs. with AER</span>
          </div>
          <div className="space-y-2">
            <FunnelBar label="Today — call everyone" fill={report.baselineConversion} color="#94a3b8" note="~1% real-world conversion" />
            <FunnelBar label="AER — call Convert-Now first" fill={report.aerConversion} color="#16a34a" note={`${pct(report.aerConversion, 0)} of contacts are quality`} />
          </div>
        </div>
      </Card>

      <p className="text-xs text-slate-400">
        Methodology: each synthetic prospect is generated from latent discipline & intent traits that set
        the hidden labels; observable transactions and digital footprint are derived from those traits with
        noise. The engine sees only the observables, so these are honest hold-out metrics — the same way a
        production model would be validated before the underwriter (human-in-the-loop) makes any decision.
      </p>
    </div>
  );
}

function Big({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <div className="text-2xl font-bold" style={{ color: accent ?? '#334155' }}>{value}</div>
      <div className="text-xs font-medium text-slate-600">{label}</div>
      <div className="text-[11px] text-slate-400">{sub}</div>
    </div>
  );
}

function FunnelBar({ label, fill, color, note }: { label: string; fill: number; color: string; note: string }) {
  return (
    <div>
      <div className="mb-0.5 flex justify-between text-xs">
        <span className="text-slate-600">{label}</span>
        <span className="text-slate-400">{note}</span>
      </div>
      <div className="h-6 w-full rounded bg-slate-100">
        <div className="flex h-6 items-center rounded pl-2 text-xs font-semibold text-white"
          style={{ width: `${Math.max(8, fill * 100)}%`, background: color }}>
          {pct(fill, 0)}
        </div>
      </div>
    </div>
  );
}
