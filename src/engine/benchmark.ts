// Benchmarking: evaluate the engine's predictions against the hidden ground-truth
// labels baked into the synthetic data. Nothing here feeds back into scoring — it is
// a pure hold-out evaluation, exactly like measuring a model on a labelled test set.

import type { ScoredProspect } from '../data/types';
import { CAPACITY_THRESHOLD, INTENT_THRESHOLD } from './score';

export interface ClassMetrics {
  accuracy: number; precision: number; recall: number; f1: number;
  tp: number; fp: number; tn: number; fn: number;
}

function confusion(items: { pred: boolean; actual: boolean }[]): ClassMetrics {
  let tp = 0, fp = 0, tn = 0, fn = 0;
  for (const { pred, actual } of items) {
    if (pred && actual) tp++;
    else if (pred && !actual) fp++;
    else if (!pred && !actual) tn++;
    else fn++;
  }
  const accuracy = (tp + tn) / Math.max(1, items.length);
  const precision = tp / Math.max(1, tp + fp);
  const recall = tp / Math.max(1, tp + fn);
  const f1 = (2 * precision * recall) / Math.max(1e-9, precision + recall);
  return { accuracy, precision, recall, f1, tp, fp, tn, fn };
}

export interface BenchmarkReport {
  n: number;
  capacity: ClassMetrics;   // predicting repayment quality
  intent: ClassMetrics;     // predicting genuine intent
  baselineConversion: number;   // "call everyone" — share of true converts in population
  aerConversion: number;        // precision of the convert-now bucket
  lift: number;                 // aerConversion / baselineConversion
  qualifiedLeads: number;       // size of convert-now bucket
  quadrantCounts: Record<string, number>;
  ragCounts: Record<string, number>;
}

export function benchmark(scored: ScoredProspect[]): BenchmarkReport {
  const capacity = confusion(scored.map((s) => ({
    pred: s.capacityScore >= CAPACITY_THRESHOLD, actual: s.prospect.truth.willRepayWell,
  })));
  const intent = confusion(scored.map((s) => ({
    pred: s.intentScore >= INTENT_THRESHOLD, actual: s.prospect.truth.genuinelyIntends,
  })));

  // A prospect genuinely "converts" only if they truly intend AND truly repay well.
  const isConvert = (s: ScoredProspect) =>
    s.prospect.truth.genuinelyIntends && s.prospect.truth.willRepayWell;
  const converts = scored.filter(isConvert).length;
  const baselineConversion = converts / Math.max(1, scored.length);

  const convertNow = scored.filter((s) => s.quadrant === 'convert-now');
  const aerConversion = convertNow.length
    ? convertNow.filter(isConvert).length / convertNow.length
    : 0;

  const quadrantCounts: Record<string, number> = {};
  const ragCounts: Record<string, number> = {};
  for (const s of scored) {
    quadrantCounts[s.quadrant] = (quadrantCounts[s.quadrant] || 0) + 1;
    ragCounts[s.rag] = (ragCounts[s.rag] || 0) + 1;
  }

  return {
    n: scored.length,
    capacity, intent,
    baselineConversion,
    aerConversion,
    lift: baselineConversion ? aerConversion / baselineConversion : 0,
    qualifiedLeads: convertNow.length,
    quadrantCounts, ragCounts,
  };
}
