import { WebSocketServer } from "ws";
import Message from "../entities/Message.js";
import translateText from "../services/translateService.js";

const clients = new Set();

async function broadcast(data) {
    const message = new Message(
        Date.now(),
        data.username,
        data.text,
        await translateText(data.text, data.language),
        data.language
    );

    for (const client of clients) {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(message));
        }
    }
}

function initWebSocket(server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        clients.add(ws);
        console.log('New client connected');

        ws.on('message', (message) => {
            broadcast(JSON.parse(message));
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

export default initWebSocket;