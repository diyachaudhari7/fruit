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
        <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl z-50 flex items-center gap-3 px-4 py-3 animate-in fade-in slide-in-from-bottom-8 duration-300 w-[90vw] max-w-sm sm:w-auto">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <p className="text-sm font-semibold text-textMain">{toastMessage}</p>
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
