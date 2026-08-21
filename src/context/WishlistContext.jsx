import React, { createContext, useContext, useState } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [savedItems, setSavedItems] = useState([]);

  const toggleSavedItem = (product) => {
    setSavedItems((prevItems) => {
      const isSaved = prevItems.find((item) => item.id === product.id);
      if (isSaved) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const isSaved = (productId) => {
    return savedItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ savedItems, toggleSavedItem, isSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
