import { useState, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.has(id);
  }, [favorites]);

  const addFavorite = useCallback((id: string) => {
    setFavorites((prev) => new Set(prev).add(id));
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.delete(id);
      return newFavorites;
    });
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
}

