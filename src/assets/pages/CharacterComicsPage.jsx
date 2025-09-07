import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useFavorites } from "../utils/useFavorites.js";

import { imgUrl } from "../utils/img.js";

const API_URL = "http://localhost:3000";

export default function CharacterComicsPage() {
  const { id } = useParams();
  const [comics, setComics] = useState([]);
  const [character, setCharacter] = useState(null); // <-- pour afficher le perso
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);

      try {
        if (!id) throw new Error("ID de personnage manquant dans l’URL.");

        const url = `${API_URL}/comics/${id}`;
        const res = await axios.get(url);

        if (cancelled) return;

        setRaw(res.data);

        // 🟢 L’API te renvoie un objet avec { thumbnail, ... , comics: [ ... ] }
        // => on récupère le tableau dans `comics` et on garde le reste comme "character"
        const { comics: comicsArr, ...charInfo } = res.data ?? {};
        if (!Array.isArray(comicsArr)) {
          throw new Error(
            "Réponse inattendue du serveur (pas de tableau `comics`)."
          );
        }

        setComics(comicsArr);
        setCharacter(charInfo || null);
      } catch (e) {
        if (!cancelled) setErr(e?.response?.data?.message || e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main>
        <h1>Comics du personnage</h1>
        <p>Chargement…</p>
      </main>
    );
  }

  if (err) {
    return (
      <main>
        <h1>Comics du personnage</h1>
        <p style={{ color: "crimson" }}>Erreur : {String(err)}</p>
        <details style={{ marginTop: 8 }}>
          <summary>Voir la réponse brute</summary>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(raw, null, 2)}
          </pre>
        </details>
        <p>
          <Link to="/characters">← Retour</Link>
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Comics du personnage</h1>
      <p style={{ opacity: 0.7 }}>ID : {id}</p>

      {/* En-tête du personnage si dispo */}
      {character && (
        <section
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            marginBottom: 16,
          }}
        >
          {character.thumbnail && (
            <img
              src={imgUrl(character.thumbnail)}
              alt={character.name || "Personnage"}
              style={{ width: 180, height: "auto", borderRadius: 12 }}
            />
          )}
          <div>
            {character.name && <h2 style={{ margin: 0 }}>{character.name}</h2>}
            {character.description && <p>{character.description}</p>}
          </div>
        </section>
      )}

      {comics.length === 0 ? (
        <>
          <p>Aucun comic trouvé.</p>
          <details style={{ marginTop: 8 }}>
            <summary>Voir la réponse brute</summary>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(raw, null, 2)}
            </pre>
          </details>
        </>
      ) : (
        <ul className="comics">
          {comics.map((cm) => (
            <li key={cm._id} className="card">
              <h3 className="comic-title">{cm.title}</h3>
              {cm.thumbnail && (
                <img src={imgUrl(cm.thumbnail)} alt={cm.title} />
              )}
              <p>{cm.description || "Pas de description"}</p>
            </li>
          ))}
        </ul>
      )}

      <p>
        <Link to="/characters">← Retour</Link>
      </p>
    </main>
  );
}
