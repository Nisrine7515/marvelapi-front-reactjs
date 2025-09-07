import { useEffect, useState } from "react";

const KEY = "marvel_favorites_v1"; // { items: [] }

function useFavorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items || []);
      }
    } catch {
      // ignore parsing errors
    }
  }, []);

  useEffect(() => {
    // sauvegarde la liste des favoris dans le localStorage du navigateur
    localStorage.setItem(KEY, JSON.stringify({ items }));
  }, [items]);

  function toggleFavorite(entry) {
    setItems((prev) => {
      // // On vérifie si l'élément (entry) est déjà présent dans la liste
      const exists = prev.find(
        (x) => x.type === entry.type && x._id === entry._id
      );
      if (exists) {
        // Si l’élément existe déjà → on le retire de la liste
        return prev.filter(
          (x) => !(x.type === entry.type && x._id === entry._id)
        );
      }

      // Si l’élément n’existe pas encore → on l’ajoute à la liste
      return [...prev, entry];
    });
  }

  function isFavorite(entry) {
    return !!items.find((x) => x.type === entry.type && x._id === entry._id);
  }

  function removeFavorite(entry) {
    setItems((prev) =>
      prev.filter((x) => !(x.type === entry.type && x._id === entry._id))
    );
  }

  return { items, toggleFavorite, isFavorite, removeFavorite };
}

export default useFavorites;
