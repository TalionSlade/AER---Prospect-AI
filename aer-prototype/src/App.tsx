import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './state/store';
import { BrandHeader } from './components/BrandHeader';
import { Cockpit } from './pages/Cockpit';
import { ProspectDetail } from './pages/ProspectDetail';
import { Benchmarks } from './pages/Benchmarks';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <BrandHeader />
          <main className="mx-auto max-w-7xl px-6 py-6">
            <Routes>
              <Route path="/" element={<Cockpit />} />
              <Route path="/prospect/:id" element={<ProspectDetail />} />
              <Route path="/benchmarks" element={<Benchmarks />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
