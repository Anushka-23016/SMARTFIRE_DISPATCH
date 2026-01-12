import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://172.18.132.242:5000/api/login",
      {
        email: username, // mapping username → email
        password,
      }
    );

    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  } catch (err) {
    setError(err.response?.data?.message || "Server error");
  }
};


  return (
    <div className="login-page">
      <div className="login-box">
        <h1>SmartFire Dispatch</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
