import { generateProspects } from '../data/generate';
import { scoreProspect } from './score';
import { benchmark } from './benchmark';

const prospects = generateProspects(2026, 60);
const scored = prospects.map(scoreProspect);
const r = benchmark(scored);

// Threshold sweep to pick the accuracy-optimal capacity cutoff.
console.log('--- capacity threshold sweep ---');
for (let t = 42; t <= 56; t += 2) {
  let tp = 0, fp = 0, tn = 0, fn = 0;
  for (const s of scored) {
    const pred = s.capacityScore >= t, actual = s.prospect.truth.willRepayWell;
    if (pred && actual) tp++; else if (pred && !actual) fp++;
    else if (!pred && !actual) tn++; else fn++;
  }
  const acc = ((tp + tn) / scored.length * 100).toFixed(1);
  const prec = (tp / Math.max(1, tp + fp) * 100).toFixed(0);
  const rec = (tp / Math.max(1, tp + fn) * 100).toFixed(0);
  console.log(`  t=${t}: acc ${acc}%  prec ${prec}%  rec ${rec}%`);
}
console.log('--------------------------------');

const pct = (x: number) => (x * 100).toFixed(1) + '%';
console.log('n =', r.n);
console.log('CAPACITY  acc', pct(r.capacity.accuracy), 'prec', pct(r.capacity.precision), 'rec', pct(r.capacity.recall), 'f1', pct(r.capacity.f1));
console.log('INTENT    acc', pct(r.intent.accuracy), 'prec', pct(r.intent.precision), 'rec', pct(r.intent.recall), 'f1', pct(r.intent.f1));
console.log('baseline conversion', pct(r.baselineConversion));
console.log('AER convert-now precision', pct(r.aerConversion), 'lift', r.lift.toFixed(1) + '×');
console.log('qualified leads (convert-now)', r.qualifiedLeads);
console.log('quadrants', r.quadrantCounts);
console.log('rag', r.ragCounts);
console.log('\nsample prospect:');
const s = scored[0];
console.log(s.prospect.name, s.prospect.segment, s.prospect.interest,
  '| cap', s.capacityScore, 'intent', s.intentScore, s.quadrant, s.rag);
console.log('  income est', s.income.monthlyIncome, '(', s.income.method, ')');
console.log('  affordability', s.affordability);
console.log('  top contributions', s.contributions.slice(0, 3).map((c) => `${c.feature}:${c.impact.toFixed(0)}`));
