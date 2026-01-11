import "../styles/login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h1>SmartFire Dispatch</h1>

        <input
          type="text"
          placeholder="Username"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button>Login</button>
      </div>
    </div>
  );
}
