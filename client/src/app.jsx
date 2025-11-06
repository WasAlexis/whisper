import './styles.css';
import { useState } from 'preact/hooks';
import { useEffect } from 'preact/hooks';
import { useRef } from 'preact/hooks';
import Message from './components/Message.jsx';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const chatHistoryRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (username) {
      const protocol = (window.location.protocol === 'https:') ? 'wss' : 'ws';
      const ws = new WebSocket(`${protocol}://${window.location.host}`);

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        wsRef.current = ws;
      }

      ws.onmessage = (event) => {
        const message = event.data;
        setMessages(prevMessages => [...prevMessages, JSON.parse(message)]);
      }

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      }

      return () => {
        ws.close();
      };
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = textareaRef.current.value;
    if (text.trim() === '') { return; }

    const newMessage = {
      id: Date.now(),
      username: username,
      text: text.trim(),
      language: localStorage.getItem('language') || 'EN',
      timestamp: new Date().toLocaleTimeString()
    };

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(newMessage));
    }

    textareaRef.current.value = '';

    setTimeout(() => {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!localStorage.getItem('username')) {
    return (
      <div className="login">
        <div className="login-card">
          <h2>Enter your username</h2>
          <input type="text" id="username" placeholder="Username" />
          <button onClick={() => {
            const username = document.getElementById('username').value;
            if (username.trim() !== '') {
              localStorage.setItem('username', username.trim());
              setUsername(username.trim());
              window.location.reload();
            }
          }}>Get in</button>
        </div>
      </div>
    );
  }

  return (
    <div className='chat-container'>
      <div className="chat-history" ref={chatHistoryRef}>
        <h2>Whisper</h2>
        {messages.map(msg => (
          <Message key={msg.id} text={msg.text} 
          sender={msg.username} 
          translatedText={msg.translatedText} />
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <textarea placeholder="Type your message..." ref={textareaRef}
         onKeyDown={handleKeyDown} />
        <button type='submit'></button>
      </form>
    </div>
  );
}

export default App;