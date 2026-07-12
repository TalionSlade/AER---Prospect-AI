import React from 'react';
import type { ReactNode } from 'react';
import type { Rag, Quadrant, Segment } from '../data/types';

// ── Brand tokens (mirrors CSS vars) ─────────────────────────────────
export const BRAND = {
  green:      '#00836c',
  greenDark:  '#006b59',
  greenLight: '#4fa9a7',
  greenPale:  '#e5f2f0',
  orange:     '#f37021',
  yellow:     '#ffaa0a',
  text:       '#222222',
  muted:      '#666666',
  light:      '#aaaaaa',
  border:     '#e0e8e6',
  canvas:     '#f5f7f6',
  sigGreen:   '#16a34a',
  sigAmber:   '#f59e0b',
  sigRed:     '#dc2626',
};

export const QUADRANT_LABEL: Record<Quadrant, string> = {
  'convert-now':      'Convert Now',
  'build-intent':     'Build Intent',
  'nurture-capacity': 'Nurture Capacity',
  'deprioritize':     'Deprioritize',
};

export const RAG_COLOR: Record<Rag, string> = {
  green: BRAND.sigGreen,
  amber: BRAND.sigAmber,
  red:   BRAND.sigRed,
};

const SEGMENT_LABEL: Record<Segment, string> = {
  salaried:            'Salaried',
  'self-employed':     'Self-employed',
  gig:                 'Gig Worker',
  'existing-borrower': 'Existing Borrower',
};

// ── Card ─────────────────────────────────────────────────────────────
export function Card({ children, className = '', style }: {
  children: ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`card-base ${className}`} style={style}>
      {children}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────────
export function SLabel({ children }: { children: ReactNode }) {
  return <div className="section-label mb-3">{children}</div>;
}

// ── RAG Badge ────────────────────────────────────────────────────────
export function RagBadge({ rag }: { rag: Rag }) {
  const cfg = {
    green: { bg: '#f0fdf4', color: '#15803d', ring: '#bbf7d0', dot: '#16a34a', label: 'GREEN' },
    amber: { bg: '#fffbeb', color: '#b45309', ring: '#fde68a', dot: '#f59e0b', label: 'AMBER' },
    red:   { bg: '#fef2f2', color: '#b91c1c', ring: '#fecaca', dot: '#dc2626', label: 'RED'   },
  }[rag];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 10px', borderRadius: 20,
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.ring}`,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
}

// ── Quadrant chip ────────────────────────────────────────────────────
export function QuadrantChip({ q }: { q: Quadrant }) {
  const cfg: Record<Quadrant, { bg: string; color: string; border: string }> = {
    'convert-now':      { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    'build-intent':     { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
    'nurture-capacity': { bg: '#f0f9ff', color: '#0369a1', border: '#bae6fd' },
    'deprioritize':     { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
  };
  const c = cfg[q];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 9px', borderRadius: 4,
      background: c.bg, color: c.color,
      border: `1px solid ${c.border}`,
      fontSize: 11, fontWeight: 600,
      fontFamily: "'Montserrat', sans-serif",
    }}>
      {QUADRANT_LABEL[q]}
    </span>
  );
}

// ── Segment tag ─────────────────────────────────────────────────────
export function SegmentTag({ segment }: { segment: Segment }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 9px', borderRadius: 4,
      background: BRAND.greenPale, color: BRAND.green,
      border: `1px solid ${BRAND.border}`,
      fontSize: 11, fontWeight: 600,
      fontFamily: "'Montserrat', sans-serif",
    }}>
      {SEGMENT_LABEL[segment]}
    </span>
  );
}

// ── Score Dial ──────────────────────────────────────────────────────
export function ScoreDial({ value, label, color }: { value: number; label: string; color: string }) {
  const r   = 36;
  const c   = 2 * Math.PI * r;
  const arc = (value / 100) * c;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg viewBox="0 0 84 84" style={{ width: 90, height: 90, transform: 'rotate(-90deg)' }}>
        <circle cx="42" cy="42" r={r} fill="none" stroke="#f0f0f0" strokeWidth="8" />
        <circle
          cx="42" cy="42" r={r} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${arc} ${c}`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text
          x="42" y="42" textAnchor="middle" dominantBaseline="central"
          transform="rotate(90 42 42)"
          fill="#222" fontSize="20" fontWeight="800"
          fontFamily="Montserrat, sans-serif"
        >
          {value}
        </text>
      </svg>
      <span style={{ marginTop: 4, fontSize: 10, fontWeight: 700, color, letterSpacing: '0.07em', textTransform: 'uppercase', fontFamily: "'Montserrat', sans-serif" }}>
        {label}
      </span>
    </div>
  );
}

// ── Contribution Bar (SHAP-style) ───────────────────────────────────
export function ContribBar({ label, detail, impact }: { label: string; detail: string; impact: number }) {
  const positive = impact >= 0;
  const w = Math.min(100, Math.abs(impact) * 2);
  return (
    <div style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#333', fontFamily: "'Montserrat', sans-serif" }}>{label}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 3,
          background: positive ? '#f0fdf4' : '#fef2f2',
          color: positive ? '#15803d' : '#b91c1c',
          fontFamily: "'Montserrat', sans-serif",
        }}>
          {positive ? '+' : '−'}{Math.abs(impact).toFixed(0)}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', height: 6, gap: 0 }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', overflow: 'hidden', borderRadius: '3px 0 0 3px' }}>
          {!positive && (
            <div style={{ height: 6, width: `${w}%`, background: 'linear-gradient(90deg, #fca5a5, #dc2626)', borderRadius: '3px 0 0 3px' }} />
          )}
        </div>
        <div style={{ width: 1, height: 12, background: '#d0d0d0', flexShrink: 0 }} />
        <div style={{ flex: 1, overflow: 'hidden', borderRadius: '0 3px 3px 0' }}>
          {positive && (
            <div style={{ height: 6, width: `${w}%`, background: 'linear-gradient(90deg, #4fa9a7, #00836c)', borderRadius: '0 3px 3px 0' }} />
          )}
        </div>
      </div>
      <p style={{ marginTop: 4, fontSize: 10, color: '#888', fontFamily: "'Montserrat', sans-serif", lineHeight: 1.4 }}>{detail}</p>
    </div>
  );
}

// ── Mini bar (for queue table) ──────────────────────────────────────
export function MiniBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 56, height: 5, borderRadius: 3, background: '#eee', overflow: 'hidden' }}>
        <div style={{ height: 5, width: `${value}%`, background: color, borderRadius: 3 }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#333', width: 24, fontFamily: "'Montserrat', sans-serif" }}>{value}</span>
    </div>
  );
}

// ── Stat box ────────────────────────────────────────────────────────
export function StatBox({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ background: '#f9fafa', borderRadius: 6, padding: '12px 10px', textAlign: 'center', border: '1px solid #eee' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: color ?? '#222', fontFamily: "'Montserrat', sans-serif" }}>{value}</div>
      <div style={{ fontSize: 10, color: '#888', marginTop: 2, fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>{label}</div>
    </div>
  );
}
