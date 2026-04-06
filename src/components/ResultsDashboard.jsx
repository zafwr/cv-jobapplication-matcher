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

      {result.evaluatedSkills && result.evaluatedSkills.length > 0 && (
        <div className="feedback-card" style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp color="var(--accent)" /> Detaylı Yetenek Analizi
          </h3>
          <div className="evaluated-skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {result.evaluatedSkills.map((skill, index) => (
              <div key={index} className="skill-evaluation-item" style={{ background: '#141414', padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--text-main)' }}>{skill.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>İlanın İstediği Önem: {skill.importance}/5</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ flex: 1, height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${(skill.candidateRating / 5) * 100}%`,
                        background: skill.candidateRating >= skill.importance ? 'var(--success)' : (skill.candidateRating > 0 ? 'var(--warning)' : 'var(--danger)'),
                        transition: 'width 1s ease-in-out'
                      }} 
                    />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 'bold', width: '50px', textAlign: 'right', color: skill.candidateRating >= skill.importance ? 'var(--success)' : (skill.candidateRating > 0 ? 'var(--warning)' : 'var(--danger)') }}>
                    Skor: {skill.candidateRating}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
