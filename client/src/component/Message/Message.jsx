import './message.css';

function Message({ text, sender, translated}) {
    return (
        <div className="message-container">
            <div className="message-header">
                <span>{sender}</span>
            </div>
            <div className="message-body">
                <div>
                    <p className='text'>{text}</p>
                    <p className='translated'>{translated}</p>
                </div>
            </div>
        </div>
    );
}

export default Message;