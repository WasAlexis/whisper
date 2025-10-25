import './styles.css';

function App() {

  return (
    <div className='chat-container'>
      <div className="chat-history"></div>
      <form className="chat-input">
        <textarea placeholder="Type your message..." />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;