import React, { useRef, useState } from 'react';
import { Target, Zap, UploadCloud, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const InputSection = ({ cvText, setCvText, jobText, setJobText }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
       setUploadError('Lütfen sadece PDF dosyası yükleyin.');
       return;
    }

    setUploadError('');
    setIsUploading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let extractedText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        extractedText += pageText + '\n\n';
      }

      setCvText(extractedText);
    } catch (err) {
      console.error('PDF Okuma Hatası:', err);
      setUploadError('PDF okunamadı. Lütfen metni kopyalayıp yapıştırmayı deneyin.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <main className="main-content">
      <div className="input-section glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2><Target color="var(--accent)" /> Senin CV'n</h2>
          
          <div style={{ position: 'relative' }}>
            <input 
              type="file" accept=".pdf" ref={fileInputRef} onChange={handlePdfUpload} style={{ display: 'none' }} 
            />
            <button 
              className="btn" 
              style={{ padding: '6px 14px', fontSize: '0.85rem', gap: '6px', backgroundColor: '#333' }}
              onClick={() => fileInputRef.current.click()}
              disabled={isUploading}
            >
              {isUploading ? <Loader2 className="spinner" size={16} /> : <UploadCloud size={16} />}
              {isUploading ? 'Okunuyor...' : 'PDF Yükle'}
            </button>
          </div>
        </div>

        {uploadError && (
          <p style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '10px' }}>{uploadError}</p>
        )}

        <textarea 
          className="input-field" 
          rows="14" 
          placeholder="CV metninizi buraya yapıştırın veya sağ üstteki butondan PDF yükleyin..."
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
        ></textarea>
      </div>

      <div className="input-section glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h2><Zap color="var(--warning)" /> İş İlanı</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>(Sadece Metin Olarak)</span>
        </div>
        
        <textarea 
          className="input-field" 
          rows="14" 
          placeholder="Başvurmak istediğiniz iş ilanının metnini buraya yapıştırın..."
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
        ></textarea>
      </div>
    </main>
  );
};

export default InputSection;
