import React, { JSX, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./PreLogin.css";
import { AuthContext } from "../../context/AuthContext";
function Login(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (username === "user1" && password === "qwerty") {
      login("ttata");
      navigate("/main");
    } else {
      console.log("3");

      alert("Invalid credentials");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="Loginbox">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>
        No account :( <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
