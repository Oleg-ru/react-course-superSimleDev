import {useState} from "react";
import LoadingSpinner from "../assets/loading-spinner.gif";
import {Chatbot} from "supersimpledev";
import "./ChatInput.css"

export function ChatInput({chatMessages, setChatMessages}) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {

        setIsLoading(true);

        setInputText('');

        const newChatMessages = [
            ...chatMessages, {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
            }];

        setChatMessages(
            [
                ...newChatMessages, {
                message: (
                    <img
                        className="chat-message-spinner"
                        src={LoadingSpinner}
                        alt="loading"
                    />),
                sender: 'robot',
                id: crypto.randomUUID(),
            }]
        )

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages, {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
            }]);
        setIsLoading(false);
    }

    function handleKeyDownInput(event) {
        if (event.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                onKeyPress={handleKeyDownInput}
                value={inputText}
                className="chat-input"
            />
            <button
                onClick={sendMessage}
                className="send-button"
                disabled={!inputText || isLoading}
                title={(!inputText || isLoading) ? 'Empty message or load answer' : ''}
            >Send
            </button>
        </div>
    );
}