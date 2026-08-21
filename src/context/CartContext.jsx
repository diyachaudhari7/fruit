import React, { createContext, useContext, useReducer, useState } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      let newItems = [...state.items];
      // Only push new items since we handle duplicates in the addItem function now
      newItems.push(action.payload);
      
      const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item => 
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      const newTotal = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return { ...state, items: newItems, total: newTotal };
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addItem = (item, quantity = 1) => {
    const exists = state.items.some(i => i.id === item.id);
    if (exists) {
      showToast('Item already added to cart!');
      return;
    }
    
    showToast(`${item.name} added to cart!`);
    dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart: state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-sm font-medium">{toastMessage}</p>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
