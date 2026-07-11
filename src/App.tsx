import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './state/store';
import { BrandHeader } from './components/BrandHeader';
import { Cockpit }        from './pages/Cockpit';
import { ProspectDetail } from './pages/ProspectDetail';
import { Benchmarks }     from './pages/Benchmarks';
import { ImportData }     from './pages/ImportData';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#f1f5f9]">
          <BrandHeader />
          <main className="mx-auto max-w-7xl px-6 py-6">
            <Routes>
              <Route path="/"               element={<Cockpit />} />
              <Route path="/prospect/:id"   element={<ProspectDetail />} />
              <Route path="/benchmarks"     element={<Benchmarks />} />
              <Route path="/import"         element={<ImportData />} />
            </Routes>
          </main>
          {/* Footer */}
          <footer className="mt-12 border-t border-slate-200 bg-white py-4 text-center text-[11px] text-slate-400">
            AER — Prospect Assist AI · IDBI Innovate 2026 · Track 2 &nbsp;·&nbsp;
            Assess · Engage · Recommend &nbsp;·&nbsp; Human-in-the-loop underwriting &nbsp;·&nbsp; AWS-native
          </footer>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
