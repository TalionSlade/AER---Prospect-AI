// AER — Prospect Assist AI · domain model
// Every type here is used by the synthetic-data generator and the scoring engine.

export type Segment = 'salaried' | 'self-employed' | 'gig' | 'existing-borrower';

export type TxnCategory =
  | 'income'          // salary / business inflow / gig payout
  | 'obligation'      // rent, EMI, insurance, SIP (committed outflow)
  | 'need'            // groceries, utilities, fuel, healthcare, education
  | 'want'            // dining, shopping, travel, entertainment, gaming
  | 'savings'         // transfer to savings/investment
  | 'transfer';       // neutral self/other transfer

export interface Txn {
  date: string;       // ISO date
  amount: number;     // positive number
  direction: 'credit' | 'debit';
  category: TxnCategory;
  merchant: string;
}

// Digital-footprint signals used by the Intent (Engagement) agent.
export interface FootprintSession {
  daysAgo: number;    // how many days before "today"
  dwellSeconds: number;
  pagesViewed: number;
  emiCalculatorUsed: boolean;
  productPageVisited: boolean;
  documentsUploaded: boolean;
  applicationStarted: boolean;
}

export type ProductInterest =
  | 'Home Loan'
  | 'Auto Loan'
  | 'Personal Loan'
  | 'Consumer Durable Loan'
  | 'Business Loan';

export interface Prospect {
  id: string;
  name: string;
  segment: Segment;
  age: number;
  city: string;
  tenureMonthsWithBank: number;
  interest: ProductInterest;
  requestedAmount: number;      // loan amount the prospect is exploring
  transactions: Txn[];          // ~6 months of statement activity
  sessions: FootprintSession[]; // recent digital footprint
  // Hidden ground truth — used ONLY for benchmarking, never shown as an input.
  truth: {
    willRepayWell: boolean;
    genuinelyIntends: boolean;
  };
}

// ---- Engine outputs ----

export interface FeatureContribution {
  feature: string;
  detail: string;
  impact: number;               // signed, roughly -100..+100 relative weight
}

export interface IncomeEstimate {
  monthlyIncome: number;
  method: string;               // human-readable explanation of how it was derived
  confidence: number;           // 0..1
}

export interface CashflowBreakdown {
  income: number;
  obligations: number;
  needs: number;
  wants: number;
  savings: number;
  disposable: number;           // income - obligations - needs
  savingsRate: number;          // savings / income
  wantsRatio: number;           // wants / income
}

export interface AffordabilityEnvelope {
  survivableEmi: number;        // max EMI carryable without tipping to delinquency
  requestedEmi: number;         // EMI implied by requestedAmount
  headroom: number;             // survivableEmi - requestedEmi (can be negative)
  verdict: 'comfortable' | 'stretch' | 'over-leveraged';
}

export interface IntentHeat {
  heat: number;                 // 0..100
  decayDaysLeft: number;        // act-by window before intent cools
  isWindowShopper: boolean;
}

export interface FraudFlags {
  level: 'clear' | 'review' | 'high';
  reasons: string[];
}

export type Quadrant = 'convert-now' | 'nurture-capacity' | 'build-intent' | 'deprioritize';
export type Rag = 'green' | 'amber' | 'red';

export interface Recommendation {
  product: ProductInterest;
  eligibleAmount: number;
  suggestedEmi: number;
  callScript: string;
  bestTimeToCall: string;
}

export interface ScoredProspect {
  prospect: Prospect;
  income: IncomeEstimate;
  cashflow: CashflowBreakdown;
  affordability: AffordabilityEnvelope;
  intent: IntentHeat;
  fraud: FraudFlags;
  capacityScore: number;        // 0..100
  intentScore: number;          // 0..100 (== intent.heat, surfaced for the quadrant)
  quadrant: Quadrant;
  rag: Rag;
  contributions: FeatureContribution[];
  recommendation: Recommendation;
}
