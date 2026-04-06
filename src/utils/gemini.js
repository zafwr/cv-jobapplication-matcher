import { GoogleGenAI } from '@google/genai';

export const analyzeMatch = async (apiKey, cvText, jobText) => {
  if (!apiKey) {
    throw new Error('API Anahtarı eksik!');
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    Sen uzman bir İnsan Kaynakları asistanı ve Kıdemli Kariyer Koçusun.
    Aşağıda verilen "CV Metni" ile "İş İlanı"nı karşılaştır ve analizi yap.
    
    YÖNERGELER:
    1. Açıklamalar ve özetler (scoreExplanation vb.) KESİNLİKLE çok sade, net ve kısa (1-2 cümle) olmalıdır.
    2. Uyum skorunu (0-100) rastgele verme. Yetenek, teknoloji ve deneyim uyumuna göre titizlikle hesapla.
    3. Kullanıcının mevcut CV metnini ilana TAM uyacak şekilde, profesyonel bir şirket jargonunda ve Action Verb'ler kullanarak yepyeni, optimize edilmiş bir metin olarak yeniden yaz (improvedCV). Sadece CV'nin kendisini döndür.
    4. İlan için kurumsal, şık ve dikkat çekici bir "İlgi Mektubu / Ön Yazı (Cover Letter)" oluştur. Karşı tarafı yormayan, yetenekleri ilana bağlayan 3-4 paragraflık akıcı bir metin olsun (coverLetter).
    
    Yanıtını SADECE aşağıdaki JSON formatında vermelisin. Başka hiçbir açıklama veya markdown satırı kullanma.

    {
      "score": <0 ile 100 arası tam sayı belirten genel puan>,
      "scoreExplanation": "<Skorun neden bu kadar olduğunu anlatan sade 2 cümlelik özet>",
      "matchingSkills": ["<eşleşen yetenek>"],
      "missingSkills": ["<eksik yetenek>"],
      "strengths": ["<çok kısa güçlü yön>"],
      "suggestions": ["<çok kısa gelişim önerisi>"],
      "improvedCV": "<CV'nin tamamının ilana özel, zenginleştirilmiş, yapısal olarak çok daha profesyonel olarak baştan yazılmış hali. Uzun olabilir.>",
      "coverLetter": "<Adayın bu iş başvurusu sırasında firmaya gönderebileceği şık ve etkileyici İlgi Mektubu (Ön Yazı) metni.>"
    }

    CV Metni:
    ${cvText}

    İş İlanı:
    ${jobText}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2, 
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text;
    const cleanText = resultText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error('Analiz sırasında bir hata oluştu. Lütfen API anahtarınızın doğruluğundan emin olun.');
  }
};
