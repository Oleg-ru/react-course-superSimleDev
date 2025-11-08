import "./LoginForm.css"
import {useState} from "react";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    function handleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <p className="title">Hello, welcome to my website</p>
            <div>
                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    className="input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                />
                <button
                    className="btn-show-password"
                    onClick={handleShowPassword}
                >Show</button>
            </div>
            <button className="btn">Login</button>
            <button className="btn">Sing up</button>
        </>
    );
}

export default LoginForm;