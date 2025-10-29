import translateIcon from '../assets/translate.svg';

function Message({ text, sender, translatedText }) {
    return (
        <div className="message-container">
            <div className="message-header">
                <small>{sender}</small>
            </div>
            <div className="message-body">
                <div>
                    <p className="message-text">{text}</p>
                    <p className='message-translated'>{translatedText}</p>
                </div>
            </div>
        </div>
    )
}

export default Message;