import React, { JSX, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import "./PreLogin.css";
function Signup() : JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        if (username == "" || email == "" || password == "") {
            alert("all fields need to be filled");
        }
        if (password != repeatPassword){
            alert("password mismatch");
            return;
        }

        e.preventDefault();
        try {
            const successmessage = await authService.register({
                username,
                email, 
                password
            });
            alert(successmessage);
            navigate("/login");
        } catch (error) {
            alert((error as Error).message);
        }
    }
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleRegister}>
                <div className="Loginbox">

                <label>Username:</label>
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                
                <label>Email:</label>
                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                
                <label>Password:</label>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <label>Repeat password:</label>
                <input
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                />
                </div>
                <button type="submit">Register</button>
                
            </form>
            <p>
                Already got an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    )
}

export default Signup;