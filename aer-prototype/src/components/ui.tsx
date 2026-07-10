import type { ReactNode } from 'react';
import type { Rag, Quadrant, Segment } from '../data/types';

export const QUADRANT_LABEL: Record<Quadrant, string> = {
  'convert-now': 'Convert Now',
  'build-intent': 'Build Intent',
  'nurture-capacity': 'Nurture Capacity',
  'deprioritize': 'Deprioritize',
};

export const RAG_COLOR: Record<Rag, string> = {
  green: '#16a34a',
  amber: '#f59e0b',
  red: '#dc2626',
};

const SEGMENT_LABEL: Record<Segment, string> = {
  salaried: 'Salaried',
  'self-employed': 'Self-employed',
  gig: 'Gig worker',
  'existing-borrower': 'Existing borrower',
};

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>
      {children}
    </div>
  );
}

export function RagBadge({ rag }: { rag: Rag }) {
  const label = rag.toUpperCase();
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
      style={{ background: RAG_COLOR[rag] }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
      {label}
    </span>
  );
}

export function QuadrantChip({ q }: { q: Quadrant }) {
  const styles: Record<Quadrant, string> = {
    'convert-now': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    'build-intent': 'bg-amber-50 text-amber-700 ring-amber-200',
    'nurture-capacity': 'bg-sky-50 text-sky-700 ring-sky-200',
    'deprioritize': 'bg-slate-100 text-slate-500 ring-slate-200',
  };
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ${styles[q]}`}>
      {QUADRANT_LABEL[q]}
    </span>
  );
}

export function SegmentTag({ segment }: { segment: Segment }) {
  return (
    <span className="rounded-md bg-teal-800/5 px-2 py-0.5 text-xs font-medium text-teal-800 ring-1 ring-teal-800/10">
      {SEGMENT_LABEL[segment]}
    </span>
  );
}

// A compact 0–100 score dial.
export function ScoreDial({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 34, c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
        />
        <text x="40" y="40" transform="rotate(90 40 40)" textAnchor="middle" dominantBaseline="central"
          className="fill-slate-800" fontSize="20" fontWeight="700">{value}</text>
      </svg>
      <span className="mt-1 text-xs font-medium text-slate-500">{label}</span>
    </div>
  );
}

// Horizontal signed contribution bar for XAI (green = raises, red = lowers).
export function ContribBar({ label, detail, impact }: { label: string; detail: string; impact: number }) {
  const w = Math.min(50, Math.abs(impact));
  const positive = impact >= 0;
  return (
    <div className="py-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className={`text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {positive ? '+' : '−'}{Math.abs(impact).toFixed(0)}
        </span>
      </div>
      <div className="mt-1 flex items-center">
        <div className="flex h-2 w-1/2 justify-end">
          {!positive && <div className="h-2 rounded-l" style={{ width: `${w * 2}%`, background: '#f43f5e' }} />}
        </div>
        <div className="h-4 w-px bg-slate-300" />
        <div className="flex h-2 w-1/2 justify-start">
          {positive && <div className="h-2 rounded-r" style={{ width: `${w * 2}%`, background: '#10b981' }} />}
        </div>
      </div>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}
