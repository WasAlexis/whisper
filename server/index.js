import http from 'node:http';
import app from './app.js';
import initWebSocket from './websocket/socketServer.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});