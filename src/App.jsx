import { useState } from 'react';
import { BrainCircuit, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { analyzeMatch } from './utils/gemini';
import InputSection from './components/InputSection';
import ResultsDashboard from './components/ResultsDashboard';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [cvText, setCvText] = useState('');
  const [jobText, setJobText] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!apiKey) {
      setError('Lütfen Gemini API Anahtarınızı girin.');
      return;
    }
    if (!cvText || !jobText) {
      setError('Lütfen hem CV hem de İş İlanı alanlarını doldurun.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeMatch(apiKey, cvText, jobText);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Bilinmeyen bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="text-gradient">
          <BrainCircuit size={40} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
          CV - İş İlanı Eşleştirici
        </h1>
      </header>

      {error && (
        <div style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '8px', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Input Alanları Component'ten geliyor */}
      <InputSection 
        cvText={cvText} setCvText={setCvText} 
        jobText={jobText} setJobText={setJobText} 
        result={result}
      />

      <section className="action-section">
        <button 
          className="btn analyze-btn" 
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="spinner" size={24} /> 
              Analiz Ediliyor...
            </>
          ) : (
            <>
              Uyum Skorunu Hesapla <ArrowRight size={24} />
            </>
          )}
        </button>
      </section>

      {loading && (
        <div className="loader">
          <Loader2 className="spinner" size={64} />
          <h2>Yapay Zeka Analiz Yapıyor...</h2>
          <p>Yeteneklerin, deneyimin ve anahtar kelimelerin inceleniyor...</p>
        </div>
      )}

      {/* Sonuç Alanı Component'ten geliyor */}
      {!loading && result && (
        <ResultsDashboard result={result} />
      )}
    </div>
  );
}

export default App;
