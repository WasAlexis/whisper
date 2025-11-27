/* message class */

class Message {
    constructor(id, username, text, translatedText, language) {
        this.id = id;
        this.username = username;
        this.text = text;
        this.translatedText = translatedText;
        this.language = language;
        this.timestamp = new Date().toLocaleTimeString();
    }
}

export default Message;