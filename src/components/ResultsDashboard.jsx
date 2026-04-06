import React, { useState } from 'react';
import { CheckCircle2, XCircle, TrendingUp, Lightbulb, Info, Copy, FileText, Mail } from 'lucide-react';

const ResultsDashboard = ({ result }) => {
  if (!result) return null;

  const [copiedSection, setCopiedSection] = useState(null);

  const scoreColor = `hsl(${Math.max(0, Math.min(100, result.score)) * 1.2}, 70%, 50%)`;

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <section className="glass-panel results-dashboard">
      <div className="score-card">
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Genel Uyum Skoru</h2>
        <div className="score-circle" style={{ '--score': result.score, '--score-color': scoreColor }}>
          <span>{result.score}</span>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <Info size={18} color="var(--primary)" />
          <strong>Skor Analizi:</strong>
        </p>
        <p style={{ maxWidth: '600px', lineHeight: '1.6', fontSize: '0.95rem' }}>
          {result.scoreExplanation}
        </p>
      </div>

      <div className="skills-grid">
        <div className="feedback-card">
          <h3><CheckCircle2 color="var(--success)" /> Eşleşen Yetenekler</h3>
          <div className="skill-list">
            {result.matchingSkills?.length > 0 ? (
              result.matchingSkills.map((skill, index) => (
                <span key={index} className="skill-tag match">{skill}</span>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Eşleşen belirgin bir yetenek bulunamadı.</p>
            )}
          </div>
        </div>

        <div className="feedback-card">
          <h3><XCircle color="var(--danger)" /> Eksik (Geliştirilecek) Yetenekler</h3>
          <div className="skill-list">
            {result.missingSkills?.length > 0 ? (
              result.missingSkills.map((skill, index) => (
                <span key={index} className="skill-tag missing">{skill}</span>
              ))
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Harika! İlandaki temel yeteneklerin tümüne sahipsiniz.</p>
            )}
          </div>
        </div>
      </div>

      <div className="feedback-section">
        <div className="feedback-card strengths" style={{ borderLeftColor: 'var(--success)' }}>
          <h3><TrendingUp color="var(--success)" /> Güçlü Yönlerin</h3>
          <ul>
            {result.strengths?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="feedback-card suggestions" style={{ borderLeftColor: 'var(--warning)' }}>
          <h3><Lightbulb color="var(--warning)" /> Gelişim Önerileri</h3>
          <ul>
            {result.suggestions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
      </div>

      {/* İleri Seviye Premium Çıktılar */}
      {(result.improvedCV || result.coverLetter) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginTop: '1rem' }}>
          
          {result.improvedCV && (
            <div className="feedback-card" style={{ borderLeftColor: '#9c27b0', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ color: '#ce93d8', margin: 0 }}><FileText /> İlana Özel Optimize Edilmiş Yeniden Yazılmış CV'niz</h3>
                <button 
                  className="btn" 
                  style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: '#333' }}
                  onClick={() => handleCopy(result.improvedCV, 'cv')}
                >
                  <Copy size={16} /> {copiedSection === 'cv' ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
              <div style={{ padding: '1.5rem', backgroundColor: '#141414', borderRadius: '6px', fontSize: '0.9rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {result.improvedCV}
              </div>
            </div>
          )}

          {result.coverLetter && (
            <div className="feedback-card" style={{ borderLeftColor: 'var(--accent)', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-main)', margin: 0 }}><Mail color="var(--accent)" /> Senin İçin Hazırlanan İlgi Mektubu (Ön Yazı)</h3>
                <button 
                  className="btn" 
                  style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: '#333' }}
                  onClick={() => handleCopy(result.coverLetter, 'coverLetter')}
                >
                  <Copy size={16} /> {copiedSection === 'coverLetter' ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
              <div style={{ padding: '1.5rem', backgroundColor: '#141414', borderRadius: '6px', fontSize: '0.9rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                {result.coverLetter}
              </div>
            </div>
          )}

        </div>
      )}

    </section>
  );
};

export default ResultsDashboard;
