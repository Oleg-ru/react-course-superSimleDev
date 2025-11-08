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

    function handleClearHistoryMessages() {
        setChatMessages([]);
    }

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                onChange={saveInputText}
                placeholder="Send a message to Chatbot"
                size="30"
                onKeyPress={handleKeyDownInput}
                value={inputText}
            />
            <button
                className="send-button"
                onClick={sendMessage}
                disabled={!inputText || isLoading}
                title={(!inputText || isLoading) ? 'Empty message or load answer' : ''}
            >Send
            </button>
            <button
                className="chat-message-clear-history-btn"
                onClick={handleClearHistoryMessages}
                disabled={isLoading}
                title={(isLoading) ? 'Loading...' : ''}
            >Clear history</button>
        </div>
    );
}