import { useEffect, useState, useRef } from "react";
import { connectWebSocket, closeSocket } from '../services/websocket.js';

function useWebSocket() {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = connectWebSocket();
        const socket = socketRef.current;

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        return () => {
            closeSocket();
        };
    }, []);

    const sendMessage = (message) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        }
    };

    return { messages, sendMessage };
}

export { useWebSocket };