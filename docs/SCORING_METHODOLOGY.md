# Scoring Methodology — AER Prospect Assist AI

> Every formula here is implemented verbatim in `aer-prototype/src/engine/score.ts`.
> All computation is deterministic — no randomness at scoring time.

---

## 1. Income Estimation Agent

### Salaried
- Identify credits matching "salary / neft / tfr" patterns
- Average the largest recurring credit per month across 6 months
- Confidence: `0.95` if variance < 5%, reduced to `0.75–0.90` for higher variance

### Self-employed
- Sum all business-category credits per month
- Apply a **55% net-margin haircut** to gross turnover
- Confidence: `0.70` (higher variance expected)

### Gig workers
- Sum all income-category micro-credits
- Compute **coefficient of variation (CV)**
- Apply income haircut = `max(0, (CV - 0.3) * 0.5)`
- Confidence: `max(0.3, 0.9 - CV * 0.5)`

---

## 2. Behavioural Cashflow Agent

Reads all debit transactions and categorises them:

| Category | Examples | Role |
|---|---|---|
| obligation | Rent, EMI, Insurance | Fixed committed outflow |
| need | BigBasket, Jio, Fuel | Essential spending |
| want | Zomato, Amazon, Dream11 | Discretionary spending |
| savings | SIP, Savings transfer | Discipline signal |

**Salary-day burn ratio**: % of "wants" spend in the 5 days after the salary credit date. High burn → impulsive spending pattern.

**Key ratios computed:**
```
savingsRate   = savings / income
wantsRatio    = wants / income
FOIR          = (obligations + new_EMI) / income
disposable    = income - obligations - needs
```

---

## 3. Repayment Capacity Score (0–100)

```
capacityScore = clamp(
  + savingsRate   * 120    // up to +36 (30% savings rate → max)
  + disciplineBonus        // 0 or +10 (savings rate > 15%)
  - wantsRatio    * 80     // up to -16 (20% wants ratio → max penalty)
  - salaryBurnPenalty      // 0 or -12 (burn > 50% → penalty)
  - foirPenalty            // 0 to -30 (FOIR > 50%)
  + tenureBonus            // 0 to +10 (years with bank)
  + incomeStabilityBonus   // 0 or +8 (income CV < 10%)
  , 2, 98
)
```

---

## 4. Affordability Envelope Agent

```
// Annual income
annualIncome = monthlyIncome * 12

// Traditional FOIR-based max EMI
foirMax = annualIncome * 0.4 / 12 - obligations

// Behavioural survivable EMI: what remains after real spending
behaviouralSurvivable = (disposable * 0.8)   // 80% of disposable

// Conservative of the two
survivableEmi = min(foirMax, behaviouralSurvivable)

// EMI implied by requested amount (12-year, 8.5% p.a.)
requestedEmi = requestedAmount * 0.01082

// Verdict
if (requestedEmi <= survivableEmi * 0.85) → 'comfortable'
if (requestedEmi <= survivableEmi)        → 'stretch'
else                                       → 'over-leveraged'
```

---

## 5. Intent Detection Agent

### Engagement heat score (0–100)
```
heat = 0
for each session:
  heat += recency_weight(session.daysAgo)
         * (base_signal + emi_bonus + docs_bonus + app_bonus)

recency_weight = max(0, 1 - daysAgo/30)
base_signal    = min(25, dwell_seconds/60 * 5 + pages * 2)
emi_bonus      = emiCalcUsed ? 20 : 0
docs_bonus     = documentsUploaded ? 25 : 0
app_bonus      = applicationStarted ? 30 : 0
```

### Act-by window (intent decay clock)
```
strongestSignal = max(applicationStarted→21d, emiCalc→14d, browsing→8d)
decayDaysLeft   = max(0, strongestSignal - daysSinceLastSession)
```

---

## 6. Fraud / Anomaly Agent

Flags raised when:
- Monthly income spike > 4× median income
- Any single credit > 2× average monthly income
- Requested amount > 80× monthly income (overreach)
- Round-number income credits (exact multiples of ₹10,000 with no variation) — synthetic credit risk

Risk levels: `clear` → `review` → `high`

---

## 7. Explainability Agent (SHAP-style)

Contributions are ranked by absolute impact. Example:

```
Feature: Savings rate
Impact:  +31
Detail:  "18% of income goes to SIP — strong discipline signal"

Feature: Wants ratio
Impact:  -8
Detail:  "12% discretionary spend — within healthy range"
```

All contributions sum to an approximation of the raw score before clamping. Green contributions raise the score; red lower it.

---

## 8. Quadrant Assignment (Orchestrator)

| Condition | Quadrant |
|---|---|
| Capacity ≥ 60 AND Intent ≥ 55 | **Convert-Now** (🎯 call today) |
| Capacity < 60 AND Intent ≥ 55 | **Nurture Capacity** (right-size the offer) |
| Capacity ≥ 60 AND Intent < 55 | **Build Intent** (re-market) |
| Capacity < 60 AND Intent < 55 | **Deprioritize** (no active push) |

### RAG Assignment
| Condition | RAG |
|---|---|
| Convert-Now | 🟢 GREEN |
| Nurture-Capacity OR Build-Intent | 🟡 AMBER |
| Deprioritize | 🔴 RED |

---

## 9. Benchmark Methodology

**Latent traits** (hidden from engine):
- `discipline_latent ∈ [0,1]` → `willRepayWell = discipline > 0.5`
- `intent_latent ∈ [0,1]` → `genuinelyIntends = intent > 0.5`

Observable data is **derived from latent traits with noise** → honest signal-to-noise ratio.

**Metrics computed**:
```
precision = TP / (TP + FP)
recall    = TP / (TP + FN)
f1        = 2 * precision * recall / (precision + recall)
accuracy  = (TP + TN) / total
```

**Conversion lift**:
```
baselineConversion = truePositives / totalProspects
aerConversion      = truePositivesInConvertNow / prospectsInConvertNow
lift               = aerConversion / baselineConversion
```

Fixed seed 2026 → identical results on every page load. No number is hand-set.

---

*AER — Prospect Assist AI · IDBI Innovate 2026*
