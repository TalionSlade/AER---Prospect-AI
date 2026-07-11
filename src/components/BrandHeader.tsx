import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/',           label: 'Officer Cockpit' },
  { to: '/benchmarks', label: 'Model Benchmarks' },
  { to: '/import',     label: 'Import Data' },
];

function NavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        height: '100%',
        color: '#fff',
        textDecoration: 'none',
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
        borderBottom: active ? '2.5px solid #ffaa0a' : '2.5px solid transparent',
        transition: 'background 0.15s',
      }}
    >
      {label}
    </Link>
  );
}

export function BrandHeader() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 40, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {/* Logo row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: 60, borderBottom: '1px solid #eeeeee' }}>
        {/* Left brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 6,
            background: 'linear-gradient(135deg, #00836c 0%, #4fa9a7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Bank pillar icon */}
            <svg viewBox="0 0 28 28" width="22" height="22" fill="white">
              <path d="M14 2L2 8h24L14 2z" opacity="0.9"/>
              <rect x="2" y="9" width="24" height="2.5" rx="0.5"/>
              <rect x="4" y="12" width="3" height="12" rx="0.5"/>
              <rect x="12.5" y="12" width="3" height="12" rx="0.5"/>
              <rect x="21" y="12" width="3" height="12" rx="0.5"/>
              <rect x="2" y="24" width="24" height="2" rx="0.5"/>
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 900, color: '#00836c', letterSpacing: '-0.5px', fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>AER</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#444', fontFamily: "'Montserrat', sans-serif" }}>Prospect Assist AI</span>
            </div>
            <div style={{ fontSize: 10, fontWeight: 500, color: '#aaa', fontFamily: "'Montserrat', sans-serif", marginTop: 1 }}>IDBI Innovate 2026 · Track 2 · Assess · Engage · Recommend</div>
          </div>
        </div>

        {/* Right: IDBI branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 12px', borderRadius: 4,
            background: 'rgba(0,131,108,0.07)',
            border: '1px solid rgba(0,131,108,0.18)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#00836c', fontFamily: "'Montserrat', sans-serif", whiteSpace: 'nowrap' }}>Human-in-the-Loop · DPDP Compliant</span>
          </div>
          <div style={{ textAlign: 'right', borderLeft: '1px solid #eee', paddingLeft: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: '#00836c', fontFamily: "'Montserrat', sans-serif", letterSpacing: 0.5 }}>IDBI BANK</div>
            <div style={{ fontSize: 9, color: '#bbb', fontFamily: "'Montserrat', sans-serif", fontStyle: 'italic' }}>Aapka Apna Bank</div>
          </div>
        </div>
      </div>

      {/* Navigation — IDBI green primary-header style */}
      <nav style={{ height: 42, background: '#00836c', display: 'flex', alignItems: 'stretch', paddingLeft: 8 }}>
        {NAV_ITEMS.map(item => <NavItem key={item.to} {...item} />)}
      </nav>
    </header>
  );
}
