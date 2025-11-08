import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessage.css";
import dayjs from "supersimpledev/dayjs";

export function ChatMessage({message, sender}) {

    function getTime() {
        const time = dayjs().valueOf();
        return dayjs(time).format("HH:mm");
    }

    return (
        <div className={
            sender === 'user'
                ? 'chat-message-user'
                : 'chat-message-robot'
        }>
            {sender === 'robot' && (
                <img
                    src={RobotProfileImage}
                    className="chat-message-profile"
                />
            )}
            <div className="chat-message-text">
                {message}
                <time className='chat-message-time'>{getTime()}</time>
            </div>

            {sender === 'user' && (
                <img
                    src={UserProfileImage}
                    className="chat-message-profile"
                />
            )}

        </div>
    );
}