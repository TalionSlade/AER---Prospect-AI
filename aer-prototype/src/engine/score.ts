// AER scoring engine — the "agentic" pipeline expressed as pure, explainable functions.
// Each section below corresponds to one agent in the architecture. The engine reads
// ONLY observable behaviour (transactions + footprint); it never sees ground truth.

import type {
  Prospect, Txn, IncomeEstimate, CashflowBreakdown, AffordabilityEnvelope,
  IntentHeat, FraudFlags, FeatureContribution, Recommendation, ScoredProspect,
  Quadrant, Rag, ProductInterest,
} from '../data/types';

const MONTHS = 6;
// Decision thresholds — shared by the orchestrator (quadrant/RAG) and the benchmark
// so evaluation always matches the live scoring. Capacity centres ~50 by design.
export const CAPACITY_THRESHOLD = 44;
export const INTENT_THRESHOLD = 55;
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));
const inr = (n: number) => Math.round(n);

// Product terms used for EMI math (annual rate %, tenure in months).
const PRODUCT_TERMS: Record<ProductInterest, { rate: number; tenure: number }> = {
  'Home Loan': { rate: 8.5, tenure: 240 },
  'Auto Loan': { rate: 9.5, tenure: 84 },
  'Personal Loan': { rate: 13, tenure: 60 },
  'Consumer Durable Loan': { rate: 14, tenure: 24 },
  'Business Loan': { rate: 11, tenure: 84 },
};

function emi(principal: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
}
function principalFromEmi(emiVal: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 100 / 12;
  if (r === 0) return emiVal * months;
  const f = Math.pow(1 + r, months);
  return (emiVal * (f - 1)) / (r * f);
}

// ---------- Agent 1: Income Estimation ----------
export function estimateIncome(p: Prospect): IncomeEstimate {
  const credits = p.transactions.filter((t) => t.direction === 'credit' && t.category === 'income');
  const total = credits.reduce((s, t) => s + t.amount, 0);
  const monthly = total / MONTHS;

  if (p.segment === 'salaried' || p.segment === 'existing-borrower') {
    return {
      monthlyIncome: inr(monthly),
      method: 'Recurring salary credits identified; averaged over 6 months.',
      confidence: 0.95,
    };
  }
  if (p.segment === 'self-employed') {
    // Turnover-to-income: apply a prudent industry margin to lumpy business receipts.
    const margin = 0.55;
    return {
      monthlyIncome: inr(monthly * margin),
      method: `Business turnover of ₹${inr(monthly).toLocaleString('en-IN')}/mo × 55% prudent industry margin (lumpy receipts smoothed over 6 months).`,
      confidence: 0.72,
    };
  }
  // gig: retained vs spent, smoothed over volatile payouts
  const cv = coefficientOfVariation(credits.map((t) => t.amount));
  return {
    monthlyIncome: inr(monthly * 0.85),
    method: `Aggregated ${credits.length} gig payouts; smoothed for volatility (CV ${(cv).toFixed(2)}) and haircut for irregularity.`,
    confidence: clamp(0.75 - cv * 0.15, 0.5, 0.8),
  };
}

function coefficientOfVariation(xs: number[]): number {
  if (xs.length < 2) return 0;
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  const variance = xs.reduce((a, b) => a + (b - mean) ** 2, 0) / xs.length;
  return mean === 0 ? 0 : Math.sqrt(variance) / mean;
}

// ---------- Agent 2: Needs/Wants cashflow breakdown ----------
export function analyzeCashflow(p: Prospect, income: number): CashflowBreakdown {
  const per = (cat: Txn['category']) =>
    p.transactions.filter((t) => t.direction === 'debit' && t.category === cat)
      .reduce((s, t) => s + t.amount, 0) / MONTHS;
  const obligations = per('obligation');
  const needs = per('need');
  const wants = per('want');
  const savings = per('savings');
  const disposable = income - obligations - needs;
  return {
    income, obligations, needs, wants, savings, disposable,
    savingsRate: income ? savings / income : 0,
    wantsRatio: income ? wants / income : 0,
  };
}

// Salary-day spend velocity: share of monthly wants spent within 5 days of a credit.
export function salaryDayDepletion(p: Prospect): number {
  const creditDays = p.transactions
    .filter((t) => t.direction === 'credit' && t.category === 'income')
    .map((t) => new Date(t.date).getTime());
  const wants = p.transactions.filter((t) => t.direction === 'debit' && t.category === 'want');
  if (!wants.length || !creditDays.length) return 0;
  let near = 0, total = 0;
  for (const w of wants) {
    total += w.amount;
    const wt = new Date(w.date).getTime();
    const closest = Math.min(...creditDays.map((c) => Math.abs(wt - c)));
    if (closest <= 5 * 864e5) near += w.amount;
  }
  return total ? near / total : 0;
}

// ---------- Agent 3: Affordability Envelope (the differentiator) ----------
export function affordability(
  p: Prospect, cf: CashflowBreakdown, depletion: number,
): AffordabilityEnvelope {
  // Behaviour-adjusted share of disposable income the prospect can safely commit.
  const behaviorFactor = clamp(
    0.4 + cf.savingsRate * 0.8 - cf.wantsRatio * 0.5 - depletion * 0.15,
    0.15, 0.65,
  );
  const survivableEmi = Math.max(0, cf.disposable * behaviorFactor);
  const terms = PRODUCT_TERMS[p.interest];
  const requestedEmi = emi(p.requestedAmount, terms.rate, terms.tenure);
  const headroom = survivableEmi - requestedEmi;
  const verdict: AffordabilityEnvelope['verdict'] =
    headroom >= requestedEmi * 0.15 ? 'comfortable'
      : headroom >= -requestedEmi * 0.1 ? 'stretch'
        : 'over-leveraged';
  return { survivableEmi: inr(survivableEmi), requestedEmi: inr(requestedEmi), headroom: inr(headroom), verdict };
}

// ---------- Agent 4: Intent Heat + decay clock ----------
export function intentHeat(p: Prospect): IntentHeat {
  const s = p.sessions;
  if (!s.length) return { heat: 5, decayDaysLeft: 0, isWindowShopper: true };
  const dwell = s.reduce((a, x) => a + x.dwellSeconds, 0);
  const emiCalc = s.some((x) => x.emiCalculatorUsed);
  const docs = s.some((x) => x.documentsUploaded);
  const started = s.some((x) => x.applicationStarted);
  const depth = s.reduce((a, x) => a + x.pagesViewed, 0);

  let heat = 0;
  heat += clamp(dwell / 1500, 0, 1) * 28;          // total engaged time
  heat += clamp(s.length / 6, 0, 1) * 18;          // repeat visits
  heat += clamp(depth / 30, 0, 1) * 14;            // browse depth
  heat += emiCalc ? 16 : 0;                        // ran the numbers
  heat += docs ? 12 : 0;                           // uploaded documents
  heat += started ? 12 : 0;                        // began application
  heat = clamp(Math.round(heat), 0, 100);

  const mostRecent = Math.min(...s.map((x) => x.daysAgo));
  // Intent decays ~ over 3 weeks; strong signals extend the window.
  const halfLife = started ? 21 : emiCalc ? 14 : 8;
  const decayDaysLeft = Math.max(0, Math.round(halfLife - mostRecent));
  const isWindowShopper = heat < 45 && !started && !docs;
  return { heat, decayDaysLeft, isWindowShopper };
}

// ---------- Agent 5: Fraud / anomaly screen ----------
export function fraudScreen(p: Prospect, income: number): FraudFlags {
  const reasons: string[] = [];
  const credits = p.transactions.filter((t) => t.direction === 'credit' && t.category === 'income');
  // Sudden inflow spike vs typical
  const amts = credits.map((t) => t.amount);
  if (amts.length) {
    const max = Math.max(...amts), median = amts.slice().sort((a, b) => a - b)[Math.floor(amts.length / 2)];
    if (max > median * 4) reasons.push('Atypical income spike (>4× median inflow)');
  }
  // Round-number inflows can indicate manufactured statements
  const round = credits.filter((t) => t.amount % 5000 === 0).length;
  if (credits.length > 3 && round / credits.length > 0.7) reasons.push('High share of round-number inflows');
  // Requested amount vastly exceeds inferred capacity
  if (p.requestedAmount > income * 12 * 7) reasons.push('Requested amount far exceeds inferred annual income');

  const level: FraudFlags['level'] = reasons.length >= 2 ? 'high' : reasons.length === 1 ? 'review' : 'clear';
  return { level, reasons };
}

// ---------- Orchestrator: compose agents into a scored, explainable prospect ----------
export function scoreProspect(p: Prospect): ScoredProspect {
  const income = estimateIncome(p);
  const cf = analyzeCashflow(p, income.monthlyIncome);
  const depletion = salaryDayDepletion(p);
  const aff = affordability(p, cf, depletion);
  const intent = intentHeat(p);
  const fraud = fraudScreen(p, income.monthlyIncome);

  // Capacity Score = behavioural repayment reliability, exactly what the bank asked
  // for: savings discipline, needs-vs-wants restraint, and salary-day spend velocity.
  // "Can this prospect afford THIS specific loan?" is a separate question answered by
  // the Affordability Envelope — kept distinct so the two never contaminate each other.
  const savingsNorm = clamp(cf.savingsRate / 0.18, 0, 1);
  const wantsNorm = clamp(cf.wantsRatio / 0.28, 0, 1);
  const depletionNorm = clamp(depletion, 0, 1);

  let capacityScore = 100 * (
    0.40 * savingsNorm +
    0.35 * (1 - wantsNorm) +
    0.25 * (1 - depletionNorm)
  );
  if (fraud.level === 'high') capacityScore *= 0.7;
  capacityScore = Math.round(clamp(capacityScore, 0, 100));
  const intentScore = intent.heat;

  const capOk = capacityScore >= CAPACITY_THRESHOLD;
  const intentOk = intentScore >= INTENT_THRESHOLD;
  const quadrant: Quadrant =
    capOk && intentOk ? 'convert-now'
      : capOk ? 'build-intent'
        : intentOk ? 'nurture-capacity'
          : 'deprioritize';

  let rag: Rag =
    quadrant === 'convert-now' ? 'green'
      : quadrant === 'deprioritize' ? 'red'
        : 'amber';
  if (fraud.level === 'high') rag = 'red';

  const contributions = buildContributions(cf, aff, intent, depletion, fraud);
  const recommendation = recommend(p, aff);

  return {
    prospect: p, income, cashflow: cf, affordability: aff, intent, fraud,
    capacityScore, intentScore, quadrant, rag, contributions, recommendation,
  };
}

function buildContributions(
  cf: CashflowBreakdown, aff: AffordabilityEnvelope, intent: IntentHeat,
  depletion: number, fraud: FraudFlags,
): FeatureContribution[] {
  const c: FeatureContribution[] = [];
  c.push({
    feature: 'EMI affordability headroom',
    detail: `Survivable EMI ₹${aff.survivableEmi.toLocaleString('en-IN')} vs requested ₹${aff.requestedEmi.toLocaleString('en-IN')} (${aff.verdict})`,
    impact: clamp(aff.headroom / Math.max(aff.requestedEmi, 1), -1, 1) * 45,
  });
  c.push({
    feature: 'Savings discipline',
    detail: `${(cf.savingsRate * 100).toFixed(0)}% of income routed to savings/SIP`,
    impact: clamp(cf.savingsRate / 0.3, 0, 1) * 25,
  });
  c.push({
    feature: 'Discretionary (wants) ratio',
    detail: `${(cf.wantsRatio * 100).toFixed(0)}% of income on discretionary spend`,
    impact: -clamp(cf.wantsRatio / 0.4, 0, 1) * 20,
  });
  c.push({
    feature: 'Salary-day spend velocity',
    detail: `${(depletion * 100).toFixed(0)}% of discretionary spend within 5 days of income`,
    impact: -clamp(depletion, 0, 1) * 12,
  });
  c.push({
    feature: 'Purchase intent signals',
    detail: intent.isWindowShopper ? 'Shallow browsing — window-shopper pattern' : `Engaged: heat ${intent.heat}, act-by ${intent.decayDaysLeft}d`,
    impact: (intent.heat - 50) / 50 * 22,
  });
  if (fraud.level !== 'clear')
    c.push({
      feature: 'Anomaly screen',
      detail: fraud.reasons.join('; '),
      impact: fraud.level === 'high' ? -30 : -12,
    });
  return c.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
}

function recommend(p: Prospect, aff: AffordabilityEnvelope): Recommendation {
  const terms = PRODUCT_TERMS[p.interest];
  const suggestedEmi = Math.max(0, Math.min(aff.survivableEmi, aff.requestedEmi));
  const eligibleRaw = principalFromEmi(aff.survivableEmi, terms.rate, terms.tenure);
  const eligibleAmount = Math.floor(Math.min(eligibleRaw, p.requestedAmount * 1.15) / 10000) * 10000;

  const hook = aff.verdict === 'comfortable'
    ? `Your account shows steady surplus after commitments — you comfortably qualify`
    : aff.verdict === 'stretch'
      ? `Based on your cash-flow we can structure this at a comfortable EMI`
      : `We can offer a right-sized amount that fits your monthly cash-flow`;

  const first = p.name.split(' ')[0];
  const callScript = `Hi ${first}, this is IDBI Bank regarding your ${p.interest} enquiry. ${hook} for up to ₹${eligibleAmount.toLocaleString('en-IN')} at approx ₹${inr(suggestedEmi).toLocaleString('en-IN')}/month. Shall I walk you through the next step?`;

  const bestTimeToCall = p.segment === 'gig' ? 'Weekend, 11am–1pm'
    : p.segment === 'self-employed' ? 'Weekday, 12pm–2pm'
      : 'Weekday, 6pm–8pm';

  return { product: p.interest, eligibleAmount, suggestedEmi: inr(suggestedEmi), callScript, bestTimeToCall };
}
