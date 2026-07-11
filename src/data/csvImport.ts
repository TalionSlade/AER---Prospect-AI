/**
 * AER CSV Import Parser
 *
 * Parses a flat CSV (one row per prospect) into the full Prospect domain model.
 * The engine then scores each prospect through the full 11-agent pipeline.
 *
 * CSV columns (order matters, header row required):
 * id, name, segment, age, city, tenureMonths, interest, requestedAmount,
 * monthlyIncome, obligations, needs, wants, savings,
 * sessionCount, totalDwellSeconds, emiCalcUsed, docsUploaded, appStarted, daysSinceLastSession
 */

import type { Prospect, Segment, ProductInterest, Txn, FootprintSession } from './types';

const SEGMENTS   = ['salaried', 'self-employed', 'gig', 'existing-borrower'] as const;
const PRODUCTS   = ['Home Loan', 'Auto Loan', 'Personal Loan', 'Consumer Durable Loan', 'Business Loan'] as const;

function parseBool(v: string): boolean {
  return ['true', '1', 'yes', 'y'].includes(v.trim().toLowerCase());
}
function parseNum(v: string, field: string): number {
  const n = parseFloat(v.replace(/,/g, '').replace(/₹/g, '').trim());
  if (isNaN(n) || n < 0) throw new Error(`Invalid number for field "${field}": "${v}"`);
  return n;
}
function parseInt2(v: string, field: string): number {
  const n = parseInt(v.trim(), 10);
  if (isNaN(n) || n < 0) throw new Error(`Invalid integer for field "${field}": "${v}"`);
  return n;
}

/**
 * Reconstruct synthetic-looking transactions from the summary columns.
 * We generate 6-month approximations so the income + cashflow agents
 * have the data they need.
 */
function buildTransactions(
  segment: Segment,
  monthlyIncome: number,
  obligations: number,
  needs: number,
  wants: number,
  savings: number,
): Txn[] {
  const txns: Txn[] = [];
  const today = new Date();

  for (let mo = 0; mo < 6; mo++) {
    const d = new Date(today);
    d.setMonth(d.getMonth() - mo);

    // Income
    const incomeDate = new Date(d);
    incomeDate.setDate(segment === 'salaried' ? 1 : Math.floor(Math.random() * 25) + 1);
    txns.push({
      date: incomeDate.toISOString().split('T')[0],
      amount: Math.round(monthlyIncome * (0.95 + Math.random() * 0.1)),
      direction: 'credit',
      category: 'income',
      merchant: segment === 'salaried' ? 'SALARY CREDIT' : segment === 'gig' ? 'GIG PAYOUT' : 'BUSINESS RECEIPT',
    });

    // Obligation
    if (obligations > 0) {
      txns.push({ date: incomeDate.toISOString().split('T')[0], amount: Math.round(obligations), direction: 'debit', category: 'obligation', merchant: 'EMI / OBLIGATION' });
    }
    // Needs
    if (needs > 0) {
      txns.push({ date: incomeDate.toISOString().split('T')[0], amount: Math.round(needs), direction: 'debit', category: 'need', merchant: 'BigBasket / Utilities' });
    }
    // Wants
    if (wants > 0) {
      txns.push({ date: incomeDate.toISOString().split('T')[0], amount: Math.round(wants), direction: 'debit', category: 'want', merchant: 'Zomato / Amazon' });
    }
    // Savings
    if (savings > 0) {
      txns.push({ date: incomeDate.toISOString().split('T')[0], amount: Math.round(savings), direction: 'debit', category: 'savings', merchant: 'SIP Transfer' });
    }
  }
  return txns;
}

function buildSessions(
  count: number,
  totalDwell: number,
  emiCalc: boolean,
  docs: boolean,
  appStarted: boolean,
  daysSince: number,
): FootprintSession[] {
  if (count === 0) return [];
  const sessions: FootprintSession[] = [];
  for (let i = 0; i < count; i++) {
    sessions.push({
      daysAgo:            daysSince + i * 3,
      dwellSeconds:       Math.round(totalDwell / count),
      pagesViewed:        Math.max(1, Math.floor(Math.random() * 8) + 2),
      emiCalculatorUsed:  i === 0 && emiCalc,
      productPageVisited: true,
      documentsUploaded:  i === 0 && docs,
      applicationStarted: i === 0 && appStarted,
    });
  }
  return sessions;
}

export function parseCSVToProspects(csvText: string): Prospect[] {
  const lines = csvText.trim().split('\n').filter(l => l.trim() && !l.startsWith('#'));
  if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row.');

  // Parse header
  const header = lines[0].split(',').map(h => h.trim().toLowerCase());
  const req = ['id', 'name', 'segment', 'age', 'city', 'tenuremonths', 'interest',
                'requestedamount', 'monthlyincome', 'obligations', 'needs', 'wants', 'savings'];
  for (const col of req) {
    if (!header.includes(col)) throw new Error(`Missing required column: "${col}"`);
  }

  const col = (row: string[], name: string) => row[header.indexOf(name)] ?? '';

  const prospects: Prospect[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    const rowNum = i + 1;
    try {
      const segment = col(row, 'segment').trim() as Segment;
      if (!SEGMENTS.includes(segment)) {
        throw new Error(`segment must be one of: ${SEGMENTS.join(', ')}`);
      }
      const interest = col(row, 'interest').trim() as ProductInterest;
      if (!PRODUCTS.includes(interest)) {
        throw new Error(`interest must be one of: ${PRODUCTS.join(', ')}`);
      }

      const monthlyIncome   = parseNum(col(row, 'monthlyincome'), 'monthlyIncome');
      const obligations     = parseNum(col(row, 'obligations'), 'obligations');
      const needs           = parseNum(col(row, 'needs'), 'needs');
      const wants           = parseNum(col(row, 'wants'), 'wants');
      const savings         = parseNum(col(row, 'savings'), 'savings');

      const sessionCount    = parseInt2(col(row, 'sessioncount') || '0', 'sessionCount');
      const totalDwell      = parseInt2(col(row, 'totaldwellseconds') || '0', 'totalDwellSeconds');
      const emiCalc         = parseBool(col(row, 'emicalcused') || 'false');
      const docs            = parseBool(col(row, 'docsuploaded') || 'false');
      const appStarted      = parseBool(col(row, 'appstarted') || 'false');
      const daysSince       = parseInt2(col(row, 'dayssincelastsession') || '0', 'daysSinceLastSession');

      const p: Prospect = {
        id:                   col(row, 'id').trim() || `CSV-${i}`,
        name:                 col(row, 'name').trim(),
        segment,
        age:                  parseInt2(col(row, 'age'), 'age'),
        city:                 col(row, 'city').trim() || 'Unknown',
        tenureMonthsWithBank: parseInt2(col(row, 'tenuremonths'), 'tenureMonths'),
        interest,
        requestedAmount:      parseNum(col(row, 'requestedamount'), 'requestedAmount'),
        transactions: buildTransactions(segment, monthlyIncome, obligations, needs, wants, savings),
        sessions:     buildSessions(sessionCount, totalDwell, emiCalc, docs, appStarted, daysSince),
        truth: {
          // Ground truth unknown for real data — set false so benchmarks exclude imported rows
          willRepayWell:    false,
          genuinelyIntends: false,
        },
      };
      prospects.push(p);
    } catch (e) {
      errors.push(`Row ${rowNum}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  if (errors.length > 0) throw new Error(`Parse errors:\n${errors.slice(0, 5).join('\n')}`);
  return prospects;
}

/** The canonical CSV template string for download */
export const CSV_TEMPLATE = `# AER Prospect Import Template
# Remove comment lines (starting with #) before uploading.
# All monetary amounts in INR (no commas or rupee symbol needed).
# Segment values: salaried | self-employed | gig | existing-borrower
# Interest values: Home Loan | Auto Loan | Personal Loan | Consumer Durable Loan | Business Loan
id,name,segment,age,city,tenureMonths,interest,requestedAmount,monthlyIncome,obligations,needs,wants,savings,sessionCount,totalDwellSeconds,emiCalcUsed,docsUploaded,appStarted,daysSinceLastSession
CUST-001,Ravi Kumar,salaried,34,Mumbai,36,Home Loan,4500000,95000,25000,18000,8000,12000,5,2400,true,true,true,3
CUST-002,Priya Sharma,salaried,29,Pune,12,Auto Loan,800000,62000,8000,12000,15000,5000,3,900,true,false,false,8
CUST-003,Mohan Reddy,self-employed,42,Hyderabad,60,Business Loan,2500000,180000,35000,20000,22000,18000,2,300,false,false,false,20
CUST-004,Aisha Khan,gig,26,Bangalore,6,Personal Loan,200000,28000,3000,8000,10000,1000,6,1800,true,false,false,1
CUST-005,Suresh Patel,existing-borrower,38,Chennai,48,Home Loan,6000000,120000,45000,20000,18000,10000,1,120,false,false,false,30
`;
