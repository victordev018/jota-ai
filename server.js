require('dotenv').config();
const express = require('express');
const axios = require('axios');
const multer = require('multer');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// Url base para a API do gemini
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

const upload = multer({ storage: multer.memoryStorage() });

app.get('/api/welcome', (req, res) => {
  res.json({ reply: "Olá! Eu sou o jotaAI 🤖 — envie textos, imagens ou ambos para eu analisar 🚀✨" });
});

app.post('/api/chat', upload.single('image'), async (req, res) => {
  const message = req.body.message;
  const contents = [];

  // 📌 Instrução inicial para o modelo
  contents.push({
    text: "Você é um assistente de IA chamado jotaAI que responde SEMPRE em português brasileiro, de forma clara, simpática e objetiva. Quando analisar imagens, descreva o conteúdo em português."
  });

  // Se veio imagem, adiciona
  if (req.file) {
    const base64Image = req.file.buffer.toString('base64');
    const mimeType = req.file.mimetype;
    contents.push({
      inlineData: {
        mimeType,
        data: base64Image
      }
    });
  }

  // Se veio texto, adiciona
  if (message) contents.push({ text: message });

  if (contents.length === 1) {
    // Só a instrução inicial — nada do usuário
    return res.status(400).json({ reply: 'Nenhuma mensagem ou imagem recebida.' });
  }

  try {
    
    const model = 'gemini-2.0-flash';
    const endpoint = `${GEMINI_BASE_URL}/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(
      endpoint,
      {
        contents: [{ role: "user", parts: contents }]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (err) {
    if (err.response) {
      console.error('Erro da API Gemini:', err.response.data);
      res.status(500).json({ reply: 'Erro na API Gemini.' });
    } else if (err.request) {
      console.error('Sem resposta da API:', err.request);
      res.status(502).json({ reply: 'Falha ao conectar com a API Gemini.' });
    } else {
      console.error('Erro desconhecido:', err.message);
      res.status(500).json({ reply: 'Erro interno do servidor.' });
    }
  }
});

app.listen(PORT, () => console.log(`jotaAI online 👉 http://localhost:${PORT}`));
