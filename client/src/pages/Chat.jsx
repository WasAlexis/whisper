import '../styles/chat.css';
import Message from '../component/Message/Message.jsx';

function Chat() {
    return (
        <div className="chat-container">
            <div className="chat-history">
                <h2>Whisper</h2>
                <Message text="Hello, how are you?" sender="Alice" translated="Hola, ¿cómo estás?" />
            </div>
            <div className="chat-input">
                <textarea placeholder="Type your message..." />
            </div>
        </div>
    );
}

export default Chat;