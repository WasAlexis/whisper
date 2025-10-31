import http from 'node:http';
import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

function broadcastMessage(data) {
  wss.clients.forEach(async (client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(
        {
          id: Date.now(),
          username: data.username,
          text: data.text,
          translatedText: await translateText(data.text, data.language),
          language: data.language,
          timestamp: new Date().toLocaleTimeString()
        }
      ));
    }
  });
}

async function translateText(text, language) {
  const targetLang = (language === 'ES') ? 'EN' : 'ES';
  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`
    },
    body: new URLSearchParams({
      text: text,
      target_lang: targetLang
    })
  });
  const data = await response.json();
  return data.translations[0].text;
}

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    broadcastMessage(JSON.parse(message));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});