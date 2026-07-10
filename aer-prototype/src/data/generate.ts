// Synthetic prospect generator.
//
// Design principle for defensible benchmarks: each prospect has two *latent* traits
// — repayment discipline and purchase intent — that (a) set the hidden ground-truth
// labels and (b) drive the observable behaviour (transactions + digital footprint)
// WITH NOISE. The scoring engine only ever sees the observable behaviour, so it
// recovers the truth imperfectly — exactly like a real model. That makes the
// accuracy/precision numbers on the benchmark slide real, not hand-set.

import { makeRng, rndInt, pick, chance, jitter, type Rng } from './rng';
import type {
  Prospect,
  Segment,
  Txn,
  TxnCategory,
  FootprintSession,
  ProductInterest,
} from './types';

const FIRST = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Krishna',
  'Ishaan', 'Rohan', 'Ananya', 'Diya', 'Aadhya', 'Saanvi', 'Pari', 'Meera', 'Riya', 'Kavya',
  'Nisha', 'Priya', 'Rahul', 'Vikram', 'Suresh', 'Deepak', 'Anil', 'Fatima', 'Zoya', 'Neha'];
const LAST = ['Sharma', 'Verma', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Gupta', 'Mehta', 'Rao',
  'Khan', 'Singh', 'Das', 'Bose', 'Menon', 'Pillai', 'Joshi', 'Kulkarni', 'Chauhan'];
const CITIES = ['Mumbai', 'Pune', 'Hyderabad', 'Bengaluru', 'Chennai', 'Delhi', 'Ahmedabad',
  'Kolkata', 'Indore', 'Jaipur', 'Kochi', 'Lucknow'];

const NEED_MERCHANTS = ['BigBasket', 'Reliance Fresh', 'Apollo Pharmacy', 'IndianOil', 'HP Petrol',
  'Adani Electricity', 'Tata Power', 'Airtel', 'Jio', 'DMart', 'School Fees', 'Metro Rail'];
const WANT_MERCHANTS = ['Zomato', 'Swiggy', 'Amazon', 'Flipkart', 'Myntra', 'MakeMyTrip', 'BookMyShow',
  'Starbucks', 'Dream11', 'Nykaa', 'PVR Cinemas', 'Uber Eats'];
const INCOME_MERCHANTS: Record<Segment, string> = {
  salaried: 'Salary Credit — Employer',
  'self-employed': 'Business Receipt — UPI/NEFT',
  gig: 'Gig Payout — Platform',
  'existing-borrower': 'Salary Credit — Employer',
};

const PRODUCT_BY_SEGMENT: Record<Segment, ProductInterest[]> = {
  salaried: ['Home Loan', 'Auto Loan', 'Personal Loan', 'Consumer Durable Loan'],
  'existing-borrower': ['Home Loan', 'Auto Loan', 'Personal Loan'],
  'self-employed': ['Business Loan', 'Auto Loan', 'Home Loan'],
  gig: ['Personal Loan', 'Consumer Durable Loan', 'Auto Loan'],
};

const MONTHS = 6;

// EMI terms mirrored from the engine, used only to size a realistic requested amount.
const PRODUCT_TERMS_GEN: Record<ProductInterest, { rate: number; tenure: number }> = {
  'Home Loan': { rate: 8.5, tenure: 240 },
  'Auto Loan': { rate: 9.5, tenure: 84 },
  'Personal Loan': { rate: 13, tenure: 60 },
  'Consumer Durable Loan': { rate: 14, tenure: 24 },
  'Business Loan': { rate: 11, tenure: 84 },
};
function principalFromEmiGen(emiVal: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 100 / 12;
  const f = Math.pow(1 + r, months);
  return (emiVal * (f - 1)) / (r * f);
}

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function baseIncomeFor(r: Rng, segment: Segment): number {
  switch (segment) {
    case 'salaried': return Math.round(jitter(r, 75000, 35000, 28000, 220000));
    case 'existing-borrower': return Math.round(jitter(r, 90000, 40000, 35000, 250000));
    case 'self-employed': return Math.round(jitter(r, 130000, 70000, 40000, 400000));
    case 'gig': return Math.round(jitter(r, 42000, 18000, 18000, 95000));
  }
}

function addTxn(list: Txn[], date: string, amount: number,
  direction: 'credit' | 'debit', category: TxnCategory, merchant: string) {
  list.push({ date, amount: Math.round(amount), direction, category, merchant });
}

function generateTransactions(
  r: Rng, segment: Segment, income: number, personalIncome: number,
  discipline: number, existingEmis: number,
): Txn[] {
  // `income` sizes the income credits (gross turnover for self-employed / gig).
  // `personalIncome` (take-home) sizes personal expenses — rent, needs, wants, savings
  // scale with what the household actually lives on, not with business turnover.
  const txns: Txn[] = [];
  for (let m = MONTHS - 1; m >= 0; m--) {
    const monthStart = m * 30;
    // ---- Income ----
    if (segment === 'salaried' || segment === 'existing-borrower') {
      addTxn(txns, isoDaysAgo(monthStart + 29), jitter(r, income, income * 0.02),
        'credit', 'income', INCOME_MERCHANTS[segment]);
    } else if (segment === 'self-employed') {
      const n = rndInt(r, 4, 9); // lumpy business receipts
      for (let i = 0; i < n; i++)
        addTxn(txns, isoDaysAgo(monthStart + rndInt(r, 1, 29)), (income / n) * jitter(r, 1, 0.5, 0.3, 2),
          'credit', 'income', INCOME_MERCHANTS[segment]);
    } else {
      const n = rndInt(r, 12, 26); // many small gig payouts
      for (let i = 0; i < n; i++)
        addTxn(txns, isoDaysAgo(monthStart + rndInt(r, 1, 29)), (income / n) * jitter(r, 1, 0.6, 0.2, 2.5),
          'credit', 'income', INCOME_MERCHANTS[segment]);
    }

    // ---- Obligations (rent + existing EMIs + insurance) ----
    const rent = personalIncome * jitter(r, 0.22, 0.05, 0.1, 0.35);
    addTxn(txns, isoDaysAgo(monthStart + 27), rent, 'debit', 'obligation', 'Rent / Housing');
    if (existingEmis > 0)
      addTxn(txns, isoDaysAgo(monthStart + 25), existingEmis, 'debit', 'obligation', 'Existing EMI');
    if (chance(r, 0.6))
      addTxn(txns, isoDaysAgo(monthStart + 20), personalIncome * 0.03, 'debit', 'obligation', 'Insurance Premium');

    // ---- Salary-day spend velocity: poorly-disciplined burn cash right after credit ----
    const burstiness = 1 - discipline; // 0 disciplined .. 1 impulsive
    const wantsBudget = personalIncome * jitter(r, 0.12 + burstinessBoost(burstiness), 0.04, 0.03, 0.6);
    const wantTxnCount = rndInt(r, 5, 12);
    for (let i = 0; i < wantTxnCount; i++) {
      // impulsive spenders cluster wants in the first 5 days after salary
      const dayOffset = chance(r, burstiness)
        ? rndInt(r, 1, 5)
        : rndInt(r, 1, 28);
      addTxn(txns, isoDaysAgo(monthStart + (29 - dayOffset)),
        (wantsBudget / wantTxnCount) * jitter(r, 1, 0.5, 0.2, 2),
        'debit', 'want', pick(r, WANT_MERCHANTS));
    }

    // ---- Needs ----
    const needsBudget = personalIncome * jitter(r, 0.28, 0.05, 0.15, 0.45);
    const needTxnCount = rndInt(r, 6, 12);
    for (let i = 0; i < needTxnCount; i++)
      addTxn(txns, isoDaysAgo(monthStart + rndInt(r, 1, 29)),
        (needsBudget / needTxnCount) * jitter(r, 1, 0.4, 0.2, 2),
        'debit', 'need', pick(r, NEED_MERCHANTS));

    // ---- Savings / SIP: disciplined prospects sweep surplus to savings ----
    const savingsRate = discipline * jitter(r, 0.22, 0.06, 0, 0.4);
    if (savingsRate > 0.02)
      addTxn(txns, isoDaysAgo(monthStart + 26), personalIncome * savingsRate, 'debit', 'savings',
        chance(r, 0.5) ? 'SIP — Mutual Fund' : 'Transfer to Savings');
  }
  return txns.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function burstinessBoost(b: number) {
  return b * 0.12; // impulsive spenders carry a higher wants baseline
}

function generateFootprint(r: Rng, intent: number): FootprintSession[] {
  // Genuine intent -> more sessions, deeper dwell, EMI calc, docs, application start.
  const sessionCount = intent > 0.5 ? rndInt(r, 3, 7) : rndInt(r, 1, 3);
  const sessions: FootprintSession[] = [];
  for (let i = 0; i < sessionCount; i++) {
    sessions.push({
      daysAgo: rndInt(r, 0, 18),
      dwellSeconds: Math.round(jitter(r, intent > 0.5 ? 260 : 70, 90, 15, 900)),
      pagesViewed: rndInt(r, 1, intent > 0.5 ? 9 : 4),
      emiCalculatorUsed: chance(r, intent * 0.85),
      productPageVisited: chance(r, 0.4 + intent * 0.5),
      documentsUploaded: chance(r, intent * 0.6),
      applicationStarted: chance(r, intent * 0.7),
    });
  }
  return sessions.sort((a, b) => a.daysAgo - b.daysAgo);
}

export function generateProspects(seed = 2026, count = 42): Prospect[] {
  const r = makeRng(seed);
  const segments: Segment[] = ['salaried', 'self-employed', 'gig', 'existing-borrower'];
  const out: Prospect[] = [];

  for (let i = 0; i < count; i++) {
    const segment = pick(r, segments);
    // Latent traits in [0,1]; truth label is the >0.5 threshold on the latent trait.
    const disciplineLatent = r();
    const intentLatent = r();
    const willRepayWell = disciplineLatent > 0.5;
    const genuinelyIntends = intentLatent > 0.5;

    const income = baseIncomeFor(r, segment);
    // Take-home the household actually lives on (self-employed/gig gross > take-home).
    const netFactor = segment === 'self-employed' ? 0.55 : segment === 'gig' ? 0.85 : 1;
    const netIncome = income * netFactor;

    const existingEmis = segment === 'existing-borrower'
      ? Math.round(netIncome * jitter(r, 0.18, 0.06, 0.05, 0.35))
      : chance(r, 0.25) ? Math.round(netIncome * jitter(r, 0.1, 0.04, 0.02, 0.2)) : 0;

    const interest = pick(r, PRODUCT_BY_SEGMENT[segment]);
    // Size the requested loan off *net* income (aligned with how the engine estimates
    // income) via a target EMI share. A wide share distribution yields a realistic mix
    // of comfortable / stretch / over-leveraged requests independent of discipline —
    // so a disciplined saver can still over-reach, and vice-versa.
    const emiShare = jitter(r, 0.2, 0.13, 0.04, 0.6);
    const targetEmi = netIncome * emiShare;
    const terms = PRODUCT_TERMS_GEN[interest];
    const principal = principalFromEmiGen(targetEmi, terms.rate, terms.tenure);
    const requestedAmount = Math.max(50000, Math.round(principal / 10000) * 10000);

    out.push({
      id: `P-${String(1000 + i)}`,
      name: `${pick(r, FIRST)} ${pick(r, LAST)}`,
      segment,
      age: rndInt(r, 24, 58),
      city: pick(r, CITIES),
      tenureMonthsWithBank: rndInt(r, 2, 140),
      interest,
      requestedAmount,
      transactions: generateTransactions(r, segment, income, netIncome, disciplineLatent, existingEmis),
      sessions: generateFootprint(r, intentLatent),
      truth: { willRepayWell, genuinelyIntends },
    });
  }
  return out;
}
