
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { toast } = useToast();

  const addToFavorites = (product) => {
    setFavorites(prevFavorites => {
      // Check if item is already in favorites
      const existingItem = prevFavorites.find(item => item.id === product.id);

      if (existingItem) {
        toast({
          title: "Already in favorites",
          description: `${product.name} is already in your favorites`,
        });
        return prevFavorites;
      } else {
        toast({
          title: "Added to favorites",
          description: `${product.name} added to your favorites`,
        });
        return [...prevFavorites, product];
      }
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productId));
    
    toast({
      title: "Removed from favorites",
      description: "Product removed from your favorites",
    });
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
