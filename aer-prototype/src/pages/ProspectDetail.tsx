import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore, type Decision } from '../state/store';
import {
  Card, RagBadge, QuadrantChip, SegmentTag, ScoreDial, ContribBar,
} from '../components/ui';
import { formatINR, formatLakh, pct } from '../lib/format';
import type { ScoredProspect } from '../data/types';

export function ProspectDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { byId } = useStore();
  const s = id ? byId(id) : undefined;

  if (!s) return (
    <div className="text-slate-500">Prospect not found. <Link to="/" className="text-teal-700 underline">Back to cockpit</Link></div>
  );

  return (
    <div className="space-y-5">
      <button onClick={() => nav('/')} className="text-sm text-teal-700 hover:underline">← Officer Cockpit</button>

      {/* Header */}
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-800">{s.prospect.name}</h1>
              <RagBadge rag={s.rag} />
              <QuadrantChip q={s.quadrant} />
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <span>{s.prospect.id}</span>·<SegmentTag segment={s.prospect.segment} />
              <span>· {s.prospect.age} yrs · {s.prospect.city} · {s.prospect.tenureMonthsWithBank} mo with IDBI</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wide text-slate-400">Enquiry</div>
            <div className="font-semibold text-slate-800">{s.prospect.interest}</div>
            <div className="text-sm text-slate-500">requested {formatLakh(s.prospect.requestedAmount)}</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* LEFT: capacity story */}
        <div className="space-y-5 lg:col-span-2">
          <Card className="p-5">
            <div className="flex items-center gap-6">
              <ScoreDial value={s.capacityScore} label="Capacity" color="#0c7c6d" />
              <ScoreDial value={s.intentScore} label="Intent Heat" color="#ee7623" />
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-slate-700">Why this score</h2>
                <p className="text-xs text-slate-500">Explainable feature contributions — green raises, red lowers.</p>
                <div className="mt-2 divide-y divide-slate-100">
                  {s.contributions.map((c) => (
                    <ContribBar key={c.feature} label={c.feature} detail={c.detail} impact={c.impact} />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Affordability envelope */}
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-700">Survivable-EMI Affordability Envelope</h2>
            <p className="text-xs text-slate-500">The max EMI this prospect can carry without tipping into delinquency — the right-sized, safe offer.</p>
            <EnvelopeBar s={s} />
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <Stat label="Survivable EMI" value={formatINR(s.affordability.survivableEmi)} color="#0c7c6d" />
              <Stat label="Requested EMI" value={formatINR(s.affordability.requestedEmi)} />
              <Stat label="Headroom"
                value={(s.affordability.headroom >= 0 ? '+' : '') + formatINR(s.affordability.headroom)}
                color={s.affordability.headroom >= 0 ? '#16a34a' : '#dc2626'} />
            </div>
          </Card>

          {/* Cashflow breakdown */}
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-700">Behavioural cash-flow read</h2>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              <span className="rounded bg-slate-100 px-2 py-0.5">Income est. {formatINR(s.income.monthlyIncome)}/mo</span>
              <span className="rounded bg-slate-100 px-2 py-0.5">confidence {pct(s.income.confidence)}</span>
            </div>
            <p className="mt-1 text-xs italic text-slate-400">{s.income.method}</p>
            <CashflowBar s={s} />
            <div className="mt-3 grid grid-cols-3 gap-3 text-center">
              <Stat label="Savings rate" value={pct(s.cashflow.savingsRate)} color="#16a34a" />
              <Stat label="Wants ratio" value={pct(s.cashflow.wantsRatio)} />
              <Stat label="Disposable / mo" value={formatINR(s.cashflow.disposable)} />
            </div>
          </Card>
        </div>

        {/* RIGHT: intent + copilot */}
        <div className="space-y-5">
          {/* Intent */}
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-700">Intent & timing</h2>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-slate-500">Heat</span>
              <span className="font-semibold text-slate-800">{s.intent.heat}/100</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm text-slate-500">Act-by window</span>
              <span className={`font-semibold ${s.intent.decayDaysLeft <= 4 && s.intent.decayDaysLeft > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                {s.intent.decayDaysLeft > 0 ? `${s.intent.decayDaysLeft} days` : 'cooled'}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
              <Signal on={!s.intent.isWindowShopper} label={s.intent.isWindowShopper ? 'Window-shopper' : 'Genuine intent'} />
              <Signal on={s.prospect.sessions.some((x) => x.emiCalculatorUsed)} label="EMI calc used" />
              <Signal on={s.prospect.sessions.some((x) => x.applicationStarted)} label="Application started" />
              <Signal on={s.prospect.sessions.some((x) => x.documentsUploaded)} label="Docs uploaded" />
              <Signal on label={`${s.prospect.sessions.length} sessions`} />
            </div>
          </Card>

          {/* Fraud */}
          <Card className="p-5">
            <h2 className="text-sm font-semibold text-slate-700">Anomaly screen</h2>
            <div className="mt-2">
              {s.fraud.level === 'clear'
                ? <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">Clear — no anomalies</span>
                : <span className={`rounded-md px-2 py-1 text-xs font-medium ${s.fraud.level === 'high' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                  {s.fraud.level === 'high' ? 'High risk' : 'Needs review'}
                </span>}
              {s.fraud.reasons.length > 0 && (
                <ul className="mt-2 list-disc pl-4 text-xs text-slate-500">
                  {s.fraud.reasons.map((r) => <li key={r}>{r}</li>)}
                </ul>
              )}
            </div>
          </Card>

          {/* Officer Copilot */}
          <Card className="p-5 ring-2 ring-teal-800/10">
            <h2 className="text-sm font-semibold text-teal-900">Loan-Officer Copilot</h2>
            <div className="mt-2 space-y-1 text-sm">
              <Row k="Recommend" v={s.recommendation.product} />
              <Row k="Eligible" v={formatLakh(s.recommendation.eligibleAmount)} />
              <Row k="Suggested EMI" v={formatINR(s.recommendation.suggestedEmi) + '/mo'} />
              <Row k="Best time" v={s.recommendation.bestTimeToCall} />
            </div>
            <div className="mt-3 rounded-lg bg-teal-800/5 p-3 text-xs italic text-teal-900">
              “{s.recommendation.callScript}”
            </div>
            <ActionButtons id={s.prospect.id} />
          </Card>
        </div>
      </div>

      {/* Transactions */}
      <Card className="p-5">
        <h2 className="mb-2 text-sm font-semibold text-slate-700">Statement sample <span className="font-normal text-slate-400">(most recent 12 of {s.prospect.transactions.length} txns analysed)</span></h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="py-1.5 pr-4 font-medium">Date</th>
                <th className="py-1.5 pr-4 font-medium">Merchant</th>
                <th className="py-1.5 pr-4 font-medium">Category</th>
                <th className="py-1.5 pr-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {s.prospect.transactions.slice(0, 12).map((t, i) => (
                <tr key={i} className="border-t border-slate-50">
                  <td className="py-1.5 pr-4 text-slate-500">{t.date}</td>
                  <td className="py-1.5 pr-4 text-slate-700">{t.merchant}</td>
                  <td className="py-1.5 pr-4"><CatTag cat={t.category} /></td>
                  <td className={`py-1.5 pr-4 text-right font-medium ${t.direction === 'credit' ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {t.direction === 'credit' ? '+' : '−'}{formatINR(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="rounded-lg bg-slate-50 py-2">
      <div className="text-base font-bold" style={{ color: color ?? '#334155' }}>{value}</div>
      <div className="text-[11px] text-slate-400">{label}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500">{k}</span>
      <span className="font-medium text-slate-800">{v}</span>
    </div>
  );
}

function Signal({ on, label }: { on: boolean; label: string }) {
  return (
    <span className={`rounded-full px-2 py-0.5 font-medium ${on ? 'bg-teal-800/10 text-teal-800' : 'bg-slate-100 text-slate-400 line-through'}`}>
      {label}
    </span>
  );
}

function CatTag({ cat }: { cat: string }) {
  const map: Record<string, string> = {
    income: 'bg-emerald-50 text-emerald-700', obligation: 'bg-rose-50 text-rose-700',
    need: 'bg-sky-50 text-sky-700', want: 'bg-amber-50 text-amber-700',
    savings: 'bg-teal-50 text-teal-700', transfer: 'bg-slate-100 text-slate-500',
  };
  return <span className={`rounded px-1.5 py-0.5 text-xs ${map[cat] ?? 'bg-slate-100'}`}>{cat}</span>;
}

function EnvelopeBar({ s }: { s: ScoredProspect }) {
  const max = Math.max(s.affordability.survivableEmi, s.affordability.requestedEmi) * 1.1 || 1;
  const survW = (s.affordability.survivableEmi / max) * 100;
  const reqW = (s.affordability.requestedEmi / max) * 100;
  const verdictColor = s.affordability.verdict === 'comfortable' ? '#16a34a'
    : s.affordability.verdict === 'stretch' ? '#f59e0b' : '#dc2626';
  return (
    <div className="mt-4 space-y-2">
      <div>
        <div className="mb-0.5 flex justify-between text-xs text-slate-500"><span>Survivable EMI</span></div>
        <div className="h-3 w-full rounded bg-slate-100"><div className="h-3 rounded" style={{ width: `${survW}%`, background: '#0c7c6d' }} /></div>
      </div>
      <div>
        <div className="mb-0.5 flex justify-between text-xs text-slate-500"><span>Requested EMI</span></div>
        <div className="h-3 w-full rounded bg-slate-100"><div className="h-3 rounded" style={{ width: `${reqW}%`, background: verdictColor }} /></div>
      </div>
      <div className="pt-1">
        <span className="rounded-md px-2 py-0.5 text-xs font-semibold text-white capitalize" style={{ background: verdictColor }}>
          {s.affordability.verdict}
        </span>
      </div>
    </div>
  );
}

function CashflowBar({ s }: { s: ScoredProspect }) {
  const inc = s.cashflow.income || 1;
  const seg = (v: number) => Math.max(0, (v / inc) * 100);
  const free = Math.max(0, s.cashflow.income - s.cashflow.obligations - s.cashflow.needs - s.cashflow.wants - s.cashflow.savings);
  const parts = [
    { label: 'Obligations', v: s.cashflow.obligations, c: '#dc2626' },
    { label: 'Needs', v: s.cashflow.needs, c: '#0ea5e9' },
    { label: 'Wants', v: s.cashflow.wants, c: '#f59e0b' },
    { label: 'Savings', v: s.cashflow.savings, c: '#16a34a' },
    { label: 'Free cash', v: free, c: '#94a3b8' },
  ];
  return (
    <div className="mt-4">
      <div className="flex h-5 w-full overflow-hidden rounded">
        {parts.map((p) => <div key={p.label} style={{ width: `${seg(p.v)}%`, background: p.c }} title={`${p.label}: ${formatINR(p.v)}`} />)}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        {parts.map((p) => (
          <span key={p.label} className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full" style={{ background: p.c }} />{p.label} {formatINR(p.v)}
          </span>
        ))}
      </div>
    </div>
  );
}

function ActionButtons({ id }: { id: string }) {
  const { decisions, decide } = useStore();
  const d = decisions[id];
  const btn = (val: Decision, label: string, cls: string) => (
    <button onClick={() => decide(id, val)}
      className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold transition ${d === val ? cls : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
      {label}
    </button>
  );
  return (
    <div className="mt-3">
      <div className="flex gap-2">
        {btn('approved', 'Approve', 'bg-emerald-600 text-white')}
        {btn('snoozed', 'Snooze', 'bg-amber-500 text-white')}
        {btn('rejected', 'Reject', 'bg-rose-600 text-white')}
      </div>
      {d && <p className="mt-2 text-center text-xs text-slate-400">Officer decision recorded: <b className="capitalize">{d}</b> · human-in-the-loop</p>}
    </div>
  );
}
