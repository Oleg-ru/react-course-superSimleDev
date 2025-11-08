import {useEffect, useRef} from "react";
import {ChatMessage} from "./ChatMessage.jsx";
import "./ChatMessages.css";

//Custom Hook
function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null)

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [dependencies])

    return chatMessagesRef;
}

export function ChatMessages({chatMessages}) {

    const chatMessagesRef = useAutoScroll(chatMessages)

    if (chatMessages.length === 0) {
        return (
            <div>
                <p className="welcome-text">Welcome to the chatbot project! Send a message using the textbox below.</p>
            </div>
        );
    }

    return (
        <div
            className="chat-messages-container"
            ref={chatMessagesRef}
        >
            {chatMessages.map((message) => {
                return (
                    <ChatMessage
                        message={message.message}
                        sender={message.sender}
                        key={message.id}
                    />
                )
            })}
        </div>
    );
}