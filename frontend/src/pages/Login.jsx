import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ username, password });
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className="border text-black"
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
