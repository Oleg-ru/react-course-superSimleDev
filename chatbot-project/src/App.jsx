import {useEffect, useState} from 'react'
import './App.css'
import {ChatInput} from "./components/ChatInput.jsx";
import {ChatMessages} from "./components/ChatMessages.jsx";
import {Chatbot} from "supersimpledev";

function App() {
    const [chatMessages, setChatMessages] = useState(
        JSON.parse(localStorage.getItem("messages")) || []
    );

    // do not work
    useEffect(() => {
        Chatbot.addResponses({
            'goodbye': 'Goodbye. Have a great day!',
            'give me a unique id': function() {
                return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
            }
        });
    }, [])

    //save to localStorage writing message
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(chatMessages));
    }, [chatMessages])

    return (
        <div className="app-container">

            <ChatMessages
                chatMessages={chatMessages}
            />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    );
}

export default App
