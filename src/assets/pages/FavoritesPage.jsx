import { useFavorites } from "../utils/useFavorites.js";

import { imgUrl } from "../utils/img.js";
import { Navigate, useLocation } from "react-router-dom";

const AUTH_TOKEN_KEY = "auth_token";

function FavoritesPage() {
  const { items, removeFavorite } = useFavorites();
  const location = useLocation();

  const authed = !!localStorage.getItem(AUTH_TOKEN_KEY);

  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <main>
      <h1>Mes favoris</h1>
      {items.length === 0 && <p>Aucun favori pour le moment.</p>}

      <ul className="favorites">
        {items.map((it) => (
          <li key={`${it.type}-${it._id}`} className="card">
            <h3>{it.type === "character" ? it.name : it.title}</h3>
            {it.thumbnail && (
              <img src={imgUrl(it.thumbnail)} alt={it.name || it.title} />
            )}
            <p>{it.description || "Pas de description"}</p>
            <button onClick={() => removeFavorite(it)}>
              Retirer des favoris
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default FavoritesPage;
