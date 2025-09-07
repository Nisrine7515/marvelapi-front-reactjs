import { useEffect, useState } from "react";
import axios from "axios";
import { getDescription } from "../utils/description";
import { useNavigate, Link } from "react-router-dom";
import { useFavorites } from "../utils/useFavorites.js";
import CharacterCarousel from "../components/CharacterCarousel.jsx";

const API_URL = "http://localhost:3000";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // récupère favoris
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get(`${API_URL}/characters`, {
          params: { page, limit: 20 }, // 20 ⇒ 2 slides de 10
        });
        // met à jour le state avec les résultats reçus
        setCharacters(response.data.results || []);
      } catch (error) {
        console.error("Erreur :", error);
      }
    }
    fetchCharacters();
  }, [page]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => p + 1);

  return (
    <main className="characters-home">
      <h1 className="characters-list">Liste des personnages Marvel</h1>

      <div>
        <button onClick={handlePrev} disabled={page === 1}>
          Précédent
        </button>
        <span> Page {page} </span>
        <button onClick={handleNext}>Suivant</button>
      </div>

      <CharacterCarousel
        characters={characters}
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
    </main>
  );
};

export default Home;
