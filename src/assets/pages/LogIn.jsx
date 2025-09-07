import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";
const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      // attendu: { token, user }
      if (res.data?.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
      }
      if (res.data?.user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.data.user));
      }
      navigate("/"); // redirection après login
    } catch (err) {
      const msg = err.response?.data?.message || "Échec de la connexion.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{ flex: 1 }}
          />
          <button
            type="button"
            className="secondary"
            onClick={() => setShowPwd((s) => !s)}
            aria-label="Afficher le mot de passe"
          >
            {showPwd ? "Masquer" : "Afficher"}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>

      <p>
        Pas encore de compte ? <Link to="/signup">S’inscrire</Link>
      </p>
    </main>
  );
}

export default LogIn;
