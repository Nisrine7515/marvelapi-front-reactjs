import { useEffect, useState } from "react";

const KEY = "marvel_favorites_v1"; // { items: [] }

export function useFavorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items || []);
      }
    } catch {
      // ignore JSON parse errors
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ items }));
  }, [items]);

  function toggleFavorite(entry) {
    setItems((prev) => {
      const exists = prev.find(
        (x) => x.type === entry.type && x._id === entry._id
      );
      if (exists) {
        return prev.filter(
          (x) => !(x.type === entry.type && x._id === entry._id)
        );
      }
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
