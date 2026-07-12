import { createContext, useContext, useMemo, useState, useCallback, type ReactNode } from 'react';
import { generateProspects } from '../data/generate';
import { scoreProspect } from '../engine/score';
import { benchmark, type BenchmarkReport } from '../engine/benchmark';
import type { ScoredProspect, Prospect } from '../data/types';
import { parseCSVToProspects } from '../data/csvImport';

export type Decision = 'approved' | 'rejected' | 'snoozed';
export type DataSource = 'synthetic' | 'imported';

interface Store {
  scored: ScoredProspect[];
  report: BenchmarkReport;
  decisions: Record<string, Decision>;
  dataSource: DataSource;
  importError: string | null;
  importCount: number;
  decide: (id: string, d: Decision) => void;
  byId: (id: string) => ScoredProspect | undefined;
  loadCSV: (csv: string) => void;
  resetToSynthetic: () => void;
}

const Ctx = createContext<Store | null>(null);

const SEED  = 2026;
const COUNT = 60;

// Synthetic dataset — generated once, stable across renders
const SYNTHETIC_SCORED = generateProspects(SEED, COUNT).map(scoreProspect);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [importedProspects, setImportedProspects] = useState<Prospect[] | null>(null);
  const [dataSource, setDataSource]   = useState<DataSource>('synthetic');
  const [importError, setImportError] = useState<string | null>(null);
  const [importCount, setImportCount] = useState(0);
  const [decisions, setDecisions]     = useState<Record<string, Decision>>({});

  const scored = useMemo<ScoredProspect[]>(() => {
    if (dataSource === 'imported' && importedProspects) {
      return importedProspects.map(scoreProspect);
    }
    return SYNTHETIC_SCORED;
  }, [dataSource, importedProspects]);

  const report = useMemo(() => benchmark(scored), [scored]);

  const decide = useCallback((id: string, d: Decision) => {
    setDecisions(prev => ({ ...prev, [id]: prev[id] === d ? undefined as unknown as Decision : d }));
  }, []);

  const loadCSV = useCallback((csv: string) => {
    setImportError(null);
    try {
      const prospects = parseCSVToProspects(csv);
      if (prospects.length === 0) throw new Error('No valid rows found in the CSV.');
      setImportedProspects(prospects);
      setDataSource('imported');
      setImportCount(prospects.length);
      setDecisions({});
    } catch (e) {
      setImportError(e instanceof Error ? e.message : 'Unknown parse error.');
    }
  }, []);

  const resetToSynthetic = useCallback(() => {
    setImportedProspects(null);
    setDataSource('synthetic');
    setImportError(null);
    setDecisions({});
  }, []);

  const value: Store = {
    scored, report, decisions, dataSource, importError, importCount,
    decide, byId: (id) => scored.find(s => s.prospect.id === id),
    loadCSV, resetToSynthetic,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used within StoreProvider');
  return s;
}
