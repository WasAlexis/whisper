import '../styles/chat.css';
import Message from '../component/Message/Message.jsx';
import { useWebSocket } from '../hooks/useWebSocket.js';
import { useState } from 'react';

function Chat() {
    const user = localStorage.getItem('username') || 'Anonymous';
    const { messages, sendMessage } = useWebSocket();
    const [inputValue, setInputValue] = useState('');
    const handleSendMessage = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const text = inputValue.trim();
            if (!text) {
                return;
            }
            const newMessage = {
                text: text,
                username: user,
                language: 'ES'
            }
            sendMessage(newMessage);
            setInputValue('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-history">
                <h2>Whisper</h2>
                {messages.map((message, index) => (
                    <Message key={index} text={message.text} sender={message.username} translated={message.translatedText} />
                ))}
            </div>
            <div className="chat-input">
                <textarea placeholder="Type your message..." onChange={(e) => { setInputValue(e.target.value); }} 
                onKeyDown={handleSendMessage} value={inputValue} />
            </div>
        </div>
    );
}

export default Chat;