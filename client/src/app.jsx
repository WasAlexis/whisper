import './styles.css';
import { useState } from 'preact/hooks';
import { useRef } from 'preact/hooks';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);
  const chatHistoryRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = textareaRef.current.value;
    if (text.trim() === '') { return; }

    const newMessage = {
      id: Date.now(),
      username: username,
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