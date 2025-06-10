const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await axios.post(
      'http://localhost:11434/api/chat',
      {
        model: 'llama3', // or any model you have pulled
        messages: [{ role: 'user', content: message }]
      }
    );
    // Ollama streams responses by default; for simplicity, use response.data.message.content
    res.json({ reply: response.data.message.content });
  } catch (err) {
    res.status(500).json({ error: 'Ollama API error', details: err.message });
  }
});

app.listen(3000, () => console.log('Proxy backend running on http://localhost:3000'));