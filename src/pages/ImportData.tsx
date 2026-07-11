import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../state/store';
import { CSV_TEMPLATE } from '../data/csvImport';
import { Card, BRAND } from '../components/ui';

export function ImportData() {
  const { loadCSV, resetToSynthetic, importError, dataSource, importCount } = useStore();
  const nav = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      alert('Please upload a .csv file.');
      return;
    }
    setFileName(file.name);
    setSuccess(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setPreview(text.split('\n').slice(0, 8).join('\n'));
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleSubmit = useCallback(() => {
    if (!fileRef.current?.files?.[0]) {
      alert('Please select a file first.');
      return;
    }
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      loadCSV(text);
      setLoading(false);
      setSuccess(true);
    };
    reader.readAsText(fileRef.current.files[0]);
  }, [loadCSV]);

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'aer-prospect-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="aer-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>Import Prospects</h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif" }}>
            Upload a CSV to score real prospect data through the AER engine. The full 11-agent pipeline runs instantly.
          </p>
        </div>
        {dataSource === 'imported' && (
          <button
            onClick={() => { resetToSynthetic(); setFileName(null); setPreview(null); setSuccess(false); }}
            style={{ background: '#eee', color: BRAND.text, border: 'none', borderRadius: 4, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'Montserrat', sans-serif" }}
          >
            ← Reset to Synthetic Data
          </button>
        )}
      </div>

      {/* Current data source banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 8,
        background: dataSource === 'imported' ? '#f0fdf4' : BRAND.greenPale,
        border: `1px solid ${dataSource === 'imported' ? '#bbf7d0' : BRAND.border}`,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: dataSource === 'imported' ? BRAND.sigGreen : BRAND.green, color: '#fff', fontSize: 14, fontWeight: 800
        }}>
          {dataSource === 'imported' ? '✓' : 'i'}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>
            {dataSource === 'imported'
              ? `Imported data active — ${importCount} prospects loaded`
              : 'Synthetic data active — 60 generated prospects (seed 2026)'}
          </div>
          <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 2, fontFamily: "'Montserrat', sans-serif" }}>
            {dataSource === 'imported'
              ? 'All scores and benchmarks are computed from your uploaded data.'
              : 'Upload a CSV below to switch to real prospect data.'}
          </div>
        </div>
        {dataSource === 'imported' && (
          <button onClick={() => nav('/')} className="btn-idbi-primary" style={{ marginLeft: 'auto' }}>
            View Cockpit →
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {/* Upload panel */}
        <Card style={{ padding: 24 }}>
          <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: BRAND.text, marginBottom: 16, fontFamily: "'Montserrat', sans-serif" }}>Upload CSV File</h2>

          {/* Drop zone */}
          <div
            style={{
              position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: `2px dashed ${dragging ? BRAND.greenLight : '#ccc'}`, borderRadius: 8, padding: '40px 24px', textAlign: 'center',
              background: dragging ? BRAND.greenPale : '#fafafa', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <input ref={fileRef} type="file" accept=".csv,.txt" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BRAND.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            {fileName ? (
              <div>
                <div style={{ fontWeight: 700, color: BRAND.green, fontSize: 13, fontFamily: "'Montserrat', sans-serif" }}>{fileName}</div>
                <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 4, fontFamily: "'Montserrat', sans-serif" }}>Click to change file</div>
              </div>
            ) : (
              <div>
                <div style={{ fontWeight: 600, color: BRAND.text, fontSize: 13, fontFamily: "'Montserrat', sans-serif" }}>Drop your CSV here</div>
                <div style={{ fontSize: 11, color: BRAND.muted, marginTop: 4, fontFamily: "'Montserrat', sans-serif" }}>or click to browse</div>
              </div>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: BRAND.muted, marginBottom: 8, fontFamily: "'Montserrat', sans-serif" }}>Preview</div>
              <pre style={{ overflowX: 'auto', background: '#111', padding: 16, borderRadius: 6, fontSize: 10, color: '#ddd', fontFamily: "monospace", lineHeight: 1.5 }}>
                {preview}
              </pre>
            </div>
          )}

          {/* Error */}
          {importError && (
            <div style={{ marginTop: 16, background: '#fef2f2', border: '1px solid #fecaca', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#b91c1c', marginBottom: 4, fontFamily: "'Montserrat', sans-serif" }}>Import Error</div>
              <pre style={{ fontSize: 10, color: '#dc2626', whiteSpace: 'pre-wrap', fontFamily: "monospace", margin: 0 }}>{importError}</pre>
            </div>
          )}

          {/* Success */}
          {success && !importError && (
            <div style={{ marginTop: 16, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: 12, borderRadius: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#15803d', fontFamily: "'Montserrat', sans-serif" }}>
                {importCount} prospects imported and scored successfully.
              </div>
            </div>
          )}

          {/* Submit */}
          {fileName && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-idbi-primary"
              style={{ width: '100%', marginTop: 20, padding: '12px 0', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Processing…' : 'Score Prospects through AER Engine'}
            </button>
          )}
        </Card>

        {/* Column spec + download */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>CSV Format Specification</h2>
              <button onClick={downloadTemplate} className="btn-idbi-orange" style={{ padding: '6px 12px', fontSize: 11 }}>
                Download Template
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {COLUMN_SPEC.map((c) => (
                <div key={c.col} style={{ display: 'flex', gap: 12, fontSize: 11, fontFamily: "'Montserrat', sans-serif" }}>
                  <code style={{ flexShrink: 0, background: BRAND.greenPale, color: BRAND.green, padding: '2px 6px', borderRadius: 4, fontWeight: 700, minWidth: 140 }}>
                    {c.col}
                  </code>
                  <span style={{ color: BRAND.muted }}>{c.desc}</span>
                  {c.required && <span style={{ marginLeft: 'auto', flexShrink: 0, color: BRAND.sigRed, fontWeight: 800 }}>*</span>}
                </div>
              ))}
              <div style={{ paddingTop: 8, fontSize: 10, color: BRAND.light, fontFamily: "'Montserrat', sans-serif" }}>* Required columns</div>
            </div>
          </Card>

          <Card style={{ padding: 20 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 800, color: BRAND.text, fontFamily: "'Montserrat', sans-serif" }}>How It Works</h2>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Download the template CSV and fill in your prospect data',
                'Each row = one prospect (name, segment, income, spending breakdown, digital sessions)',
                'The AER engine reconstructs 6-month transaction history from your summary columns',
                'All 11 agents run: Income, Cashflow, Capacity, Affordability, Intent, Fraud, XAI, Compliance, Recommendation, Orchestrator',
                'Results appear instantly in the Officer Cockpit and Benchmarks pages',
              ].map((s, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 11, color: BRAND.muted, fontFamily: "'Montserrat', sans-serif", lineHeight: 1.4 }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', background: BRAND.green, color: '#fff', fontSize: 9, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}

const COLUMN_SPEC = [
  { col: 'id',                   desc: 'Unique customer ID (e.g. CUST-001)',               required: true  },
  { col: 'name',                 desc: 'Full name of the prospect',                         required: true  },
  { col: 'segment',              desc: 'salaried | self-employed | gig | existing-borrower',required: true  },
  { col: 'age',                  desc: 'Age in years',                                      required: true  },
  { col: 'city',                 desc: 'City of residence',                                  required: true  },
  { col: 'tenureMonths',         desc: 'Months as an IDBI Bank customer',                   required: true  },
  { col: 'interest',             desc: 'Home Loan | Auto Loan | Personal Loan | …',         required: true  },
  { col: 'requestedAmount',      desc: 'Requested loan amount in INR',                      required: true  },
  { col: 'monthlyIncome',        desc: 'Estimated gross monthly income in INR',              required: true  },
  { col: 'obligations',          desc: 'Monthly committed outflows (rent, EMI, insurance)', required: true  },
  { col: 'needs',                desc: 'Essential monthly spend (groceries, utilities)',     required: true  },
  { col: 'wants',                desc: 'Discretionary monthly spend (dining, shopping)',     required: true  },
  { col: 'savings',              desc: 'Monthly SIP / savings transfers',                   required: true  },
  { col: 'sessionCount',         desc: 'Number of website sessions in last 30 days',        required: false },
  { col: 'totalDwellSeconds',    desc: 'Total time spent on loan product pages (seconds)',   required: false },
  { col: 'emiCalcUsed',          desc: 'true/false — did prospect use EMI calculator?',     required: false },
  { col: 'docsUploaded',         desc: 'true/false — did prospect upload documents?',       required: false },
  { col: 'appStarted',           desc: 'true/false — did prospect begin application?',      required: false },
  { col: 'daysSinceLastSession', desc: 'Days since most recent website visit',              required: false },
];
