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
    2. Adayın "Karşılama Skoru" (candidateRating) parametresini belirlerken ÇOK ACIMASIZ VE KATI ol. Eğer bir yetenek/araç CV'de açıkça yazmıyorsa veya deneyim yetersizse kesinlikle 0 veya 1 ver. Tahmin yürütme.
    3. Kullanıcının mevcut CV metnini ilana TAM uyacak şekilde, profesyonel bir şirket jargonunda ve Action Verb'ler kullanarak yepyeni, optimize edilmiş bir metin olarak yeniden yaz (improvedCV). Sadece CV'nin kendisini döndür.
    4. İlan için kurumsal, şık ve dikkat çekici bir "İlgi Mektubu / Ön Yazı (Cover Letter)" oluştur. Karşı tarafı yormayan, yetenekleri ilana bağlayan 3-4 paragraflık akıcı bir metin olsun (coverLetter).
    
    Yanıtını SADECE aşağıdaki JSON formatında vermelisin. Başka hiçbir açıklama veya markdown satırı kullanma.

    {
      "scoreExplanation": "<Genel uyumun kısa özeti>",
      "evaluatedSkills": [
        {
          "name": "<Yetenek, deneyim veya gereksinim adı>",
          "importance": <1'den 5'e kadar ilandaki önem derecesi: 5 çok kritik/zorunlu, 1 sadece tercih sebebi>,
          "candidateRating": <0'dan 5'e kadar adayın sahip olma skoru: 5 tam uzman/yıllarca deneyimli, 0 hiç yok>
        }
      ],
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
        temperature: 0.1, 
        responseMimeType: 'application/json',
      }
    });

    const resultText = response.text;
    const cleanText = resultText.replace(/\`\`\`json/gi, '').replace(/\`\`\`/g, '').trim();
    
    const parsedData = JSON.parse(cleanText);

    // AI'ın matematiksel halüsinasyonunu engellemek için skoru sistemde kesin formülle hesaplıyoruz:
    if (parsedData.evaluatedSkills && parsedData.evaluatedSkills.length > 0) {
      let maxPossibleScore = 0;
      let actualScore = 0;
      
      parsedData.evaluatedSkills.forEach(skill => {
        const imp = Number(skill.importance) || 1;
        const rating = Number(skill.candidateRating) || 0;
        
        maxPossibleScore += (imp * 5); 
        actualScore += (imp * rating);
      });
      
      if (maxPossibleScore > 0) {
        parsedData.score = Math.round((actualScore / maxPossibleScore) * 100);
      } else {
        parsedData.score = 0;
      }
    } else {
      parsedData.score = 0;
    }

    return parsedData;
  } catch (error) {
    console.error("Gemini API Error Orijinal:", error);
    throw new Error('Analiz Hatası: ' + (error?.message || 'Bilinmeyen Hata, tarayıcı konsoluna (F12) bakın. Lütfen API Anahtarınızın güncel ve doğru olduğundan (ve terminali yeniden başlattığınızdan) emin olun.'));
  }
};
