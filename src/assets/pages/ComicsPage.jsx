import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { useFavorites } from "../utils/useFavorites.js";
import { imgUrl } from "../utils/img.js";

const API_URL = "http://localhost:3000";

export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  const limit = 20;

  const totalPages = Math.max(1, Math.ceil(count / limit));
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchComics() {
      const params = { page, limit };
      if (title) params.title = title;
      const res = await axios.get(`${API_URL}/comics`, { params });

      // Tri alphabétique par titre (au cas où l'API ne renvoie pas triée)
      const results = (res.data.results || []).slice().sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", "fr", {
          sensitivity: "base",
        })
      );

      setComics(results);
      setCount(res.data.count || 0);
    }
    fetchComics();
  }, [page, title]);

  function submitSearch() {
    setPage(1);
  }

  return (
    <main>
      <h1>Liste des comics Marvel</h1>

      <SearchBar
        value={title}
        onChange={setTitle}
        onSubmit={submitSearch}
        placeholder="Rechercher un comic…"
      />

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      <ul className="comics">
        {comics.map((cm) => (
          <li key={cm._id} className="card">
            <h3 className="comic-title">{cm.title}</h3>
            {cm.thumbnail && <img src={imgUrl(cm.thumbnail)} alt={cm.title} />}
            <p>{cm.description || "Pas de description"}</p>

            <button
              onClick={() =>
                toggleFavorite({
                  type: "comic",
                  _id: cm._id,
                  title: cm.title,
                  thumbnail: cm.thumbnail,
                  description: cm.description || "",
                })
              }
            >
              {isFavorite({ type: "comic", _id: cm._id })
                ? "★ Retirer des favoris"
                : "☆ Ajouter aux favoris"}
            </button>
          </li>
        ))}
      </ul>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </main>
  );
}
