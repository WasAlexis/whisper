import './styles.css';
import { useState } from 'preact/hooks';
import { useRef } from 'preact/hooks';

function App() {
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const chatHistoryRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = textareaRef.current.value;
    if (text.trim() === '') { return; }

    const newMessage = {
      id: Date.now(),
      username: 'You',
      text: text.trim(),
      language: 'en',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, newMessage]);
    textareaRef.current.value = '';

    setTimeout(() => {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }, 0);
  };

  return (
    <div className='chat-container'>
      <div className="chat-history" ref={chatHistoryRef}>
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <textarea placeholder="Type your message..." ref={textareaRef} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;