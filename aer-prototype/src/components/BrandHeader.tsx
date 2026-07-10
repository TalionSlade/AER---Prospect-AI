import { Link, useLocation } from 'react-router-dom';

function NavLink({ to, children }: { to: string; children: string }) {
  const { pathname } = useLocation();
  const active = to === '/' ? pathname === '/' : pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  );
}

export function BrandHeader() {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 shadow-md"
      style={{ background: 'linear-gradient(90deg,#0c7c6d 0%,#0e8074 60%,#12968a 100%)' }}
    >
      <div className="flex items-center gap-3">
        {/* Bank icon motif */}
        <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: '#ee7623' }}>
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
            <path d="M12 3 2 8v2h20V8L12 3Zm-7 9v6H4v2h16v-2h-1v-6h-2v6h-3v-6h-2v6H9v-6H7v6H6v-6H5Z" />
          </svg>
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-white">AER</span>
            <span className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold text-white/90">
              PROSPECT ASSIST AI
            </span>
          </div>
          <span className="text-[11px] text-white/60">IDBI Innovate 2026 · Track 2</span>
        </div>
      </div>
      <nav className="flex items-center gap-1">
        <NavLink to="/">Officer Cockpit</NavLink>
        <NavLink to="/benchmarks">Model Benchmarks</NavLink>
      </nav>
    </header>
  );
}
