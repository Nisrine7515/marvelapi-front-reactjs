import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3000";
const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // optionnel selon ton API
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
      const payload = { email, password };
      if (username) payload.username = username;

      const res = await axios.post(`${API_URL}/signup`, payload);
      // attendu: { token, user }
      if (res.data?.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
      }
      if (res.data?.user) {
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.data.user));
      }
      navigate("/"); // redirection après inscription
    } catch (err) {
      const msg = err.response?.data?.message || "Échec de l'inscription.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>S’inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d’utilisateur (optionnel)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
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
            autoComplete="new-password"
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
        {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Création…" : "Créer mon compte"}
        </button>
      </form>

      <p>
        Déjà inscrit ? <Link to="/login">Se connecter</Link>
      </p>
    </main>
  );
}

export default SignUp;
