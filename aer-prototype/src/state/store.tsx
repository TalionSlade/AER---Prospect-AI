import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { generateProspects } from '../data/generate';
import { scoreProspect } from '../engine/score';
import { benchmark, type BenchmarkReport } from '../engine/benchmark';
import type { ScoredProspect } from '../data/types';

export type Decision = 'approved' | 'rejected' | 'snoozed';

interface Store {
  scored: ScoredProspect[];
  report: BenchmarkReport;
  decisions: Record<string, Decision>;
  decide: (id: string, d: Decision) => void;
  byId: (id: string) => ScoredProspect | undefined;
}

const Ctx = createContext<Store | null>(null);

// Dataset is generated + scored ONCE (deterministic seed) so the demo is stable.
const SEED = 2026;
const COUNT = 60;

export function StoreProvider({ children }: { children: ReactNode }) {
  const scored = useMemo(
    () => generateProspects(SEED, COUNT).map(scoreProspect),
    [],
  );
  const report = useMemo(() => benchmark(scored), [scored]);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const value: Store = {
    scored,
    report,
    decisions,
    decide: (id, d) =>
      setDecisions((prev) => ({ ...prev, [id]: prev[id] === d ? undefined as unknown as Decision : d })),
    byId: (id) => scored.find((s) => s.prospect.id === id),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used within StoreProvider');
  return s;
}
