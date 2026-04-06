# 🎯 AI-Powered CV & Job Matcher

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white)

Yapay zeka destekli akıllı bir İnsan Kaynakları & Kariyer asistanı projesi. 

Kullanıcıların mevcut CV'lerini hedefledikleri iş ilanı ile karşılaştırır; onlara 0'dan 100'e uyum skoru verir, güçlü/eksik yeteneklerini analiz eder ve ilana özel yeni bir CV ile ilgi mektubu hazırlar.

## ✨ Öne Çıkan Özellikler

* 📄 **PDF Okuyucu:** `pdfjs-dist` kullanılarak, hiçbir backend'e ihtiyaç duymadan PDF uzantılı CV'leri doğrudan tarayıcı içerisinden saniyeler içinde okuma.
* 🧠 **Gemini AI Entegrasyonu:** `@google/genai` kullanılarak ileri seviye prompt engineering tabanlı sistem tasarımı.
* 🚀 **Otomatik İyileştirme:** İş ilanına harfiyen uyacak yeni bir **"Profesyonel CV"** ve çarpıcı bir **"İlgi Mektubu"** üretim algoritması.
* 🎨 **Matte Dark Tasarım:** Göz yormayan, gölgelerden arındırılmış, renk geçişli skor sistemine sahip fütüristik arayüz. Kopyalanabilir dinamik bileşenler.
* 🔒 **Backend-Free:** Tamamen tarayıcı odaklı, modern Single Page Application deneyimi.

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** React.js, Vite
- **Stil & Tasarım:** Vanilla CSS, Lucide React İkonları
- **Yapay Zeka & API:** Google Gemini 2.5 Flash
- **Veri İşleme:** PDF.js

---

## 💻 Kurulum & Geliştirici Rehberi

Projeyi kendi bilgisayarınızda çalıştırmak için şu adımları izleyin:

**1. Projeyi İndirin:**
\`\`\`bash
git clone https://github.com/zafwr/cv-jobapplication-matcher.git
cd cv-jobapplication-matcher
\`\`\`

**2. Bağımlılıkları Yükleyin:**
\`\`\`bash
npm install
\`\`\`

**3. Çevre Değişkenlerini Ayarlayın:**
Ana dizinde bir \`.env\` dosyası oluşturun ve içerisine Google AI Studio'dan aldığınız API anahtarını ekleyin:
\`\`\`text
VITE_GEMINI_API_KEY=sizin_api_anahtariniz_buraya
\`\`\`

**4. Geliştirme Sunucusunu Başlatın:**
\`\`\`bash
npm run dev
\`\`\`



