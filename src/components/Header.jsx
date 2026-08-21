import React, { useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { MOCK_DATA } from '../data/mockData';

export function Header({ onSearch }) {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/categories?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/home')}>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-primary">Freshly</h1>
        </div>
        
        {/* Search Bar in Header (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-12">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for fruits, vegetables..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
              value={searchQuery}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-textMain shrink-0">
          <button className="flex flex-col items-center justify-center relative hover:text-primary transition-colors" onClick={() => navigate('/cart')}>
            <div className="relative">
              <ShoppingCart size={24} />
              {cart.items.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cart.items.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium mt-1">Cart</span>
          </button>
          <button className="flex flex-col items-center justify-center hover:text-primary transition-colors" onClick={() => navigate('/profile')}>
            <User size={24} />
            <span className="text-[10px] font-medium mt-1">Profile</span>
          </button>
        </div>
      </div>

      {/* Mobile Search (inside sticky header) */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </header>
  );
}
