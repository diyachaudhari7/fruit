import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_DATA } from '../data/mockData';
import { Card, CardContent } from '../components/ui/Card';
import { ChevronLeft, SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addItem } = useCart();
  const [sortBy, setSortBy] = useState('featured');

  const category = MOCK_DATA.categories.find(c => c.id === id);
  let products = MOCK_DATA.products.filter(p => p.categoryId === id);

  // Sorting logic
  if (sortBy === 'price-low') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Gradients for category banners based on ID
  const bannerGradients = {
    c1: 'from-orange-400 to-red-500',
    c2: 'from-green-400 to-emerald-600',
    c3: 'from-purple-400 to-fuchsia-600',
    c4: 'from-blue-400 to-indigo-600',
    c5: 'from-yellow-400 to-amber-600',
    c6: 'from-rose-400 to-red-600',
    c7: 'from-amber-500 to-orange-700',
    c8: 'from-cyan-400 to-blue-600',
  };
  const gradient = bannerGradients[id] || 'from-primary to-secondary';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Category Banner Header */}
      <div className={`bg-gradient-to-r ${gradient} text-white pt-12 pb-8 px-4 shadow-md relative`}>
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-white/90 hover:text-white bg-black/10 rounded-full p-2 backdrop-blur-sm transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="max-w-7xl mx-auto mt-6">
          <h1 className="text-4xl font-heading font-bold mb-2">{category?.name || 'Category'}</h1>
          <p className="text-white/80 font-medium">
            {products.length} {products.length === 1 ? 'item' : 'items'} available
          </p>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <button className="flex items-center gap-2 text-sm font-medium text-textMuted hover:text-primary transition-colors">
            <SlidersHorizontal size={18} /> Filters
          </button>
          
          <div className="flex items-center gap-2 text-sm">
            <ArrowDownUp size={16} className="text-textMuted" />
            <select 
              className="bg-transparent font-medium text-textMain outline-none cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 max-w-7xl mx-auto mt-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map(product => (
              <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">
                    <p className="text-xs font-bold text-primary flex items-center gap-1">★ {product.rating}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-textMain text-sm line-clamp-1 mb-1">{product.name}</h4>
                  <p className="text-xs text-textMuted line-clamp-1 mb-3">{product.description}</p>
                  
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="font-bold text-lg text-primary leading-none">${product.price}</p>
                      <p className="text-[10px] text-textMuted mt-1">per {product.unit}</p>
                    </div>
                    <button 
                      className="w-9 h-9 rounded-full bg-lightGreen text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        addItem(product, 1);
                      }}
                    >
                      <span className="text-xl font-medium leading-none mb-1">+</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🛒</span>
            </div>
            <h3 className="text-xl font-heading font-bold text-textMain mb-2">No products found</h3>
            <p className="text-textMuted max-w-sm">We currently don't have any products available in this category. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}
