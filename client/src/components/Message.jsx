import translateIcon from '../assets/translate.svg';

function Message({ text, sender }) {
    return (
        <div className="message-container">
            <div className="message-header">
                <small>{sender}</small>
            </div>
            <div className="message-body">
                <div>
                    <p className="message-text">{text}</p>
                    <p className='message-translated'>{text}</p>
                </div>
                <img src={translateIcon} alt="" />
            </div>
        </div>
    )
}

export default Message;