import React, { useState, useEffect } from 'react';
import { MOCK_DATA } from '../data/mockData';
import { Card, CardContent } from '../components/ui/Card';
import { Search, ShoppingCart, User, ArrowRight, Leaf, Home as HomeIcon, Truck, ShieldCheck, MapPin, FlaskConical, Clock, Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { FeaturesStrip } from '../components/FeaturesStrip';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export function Home() {
  const navigate = useNavigate();
  const { cart, addItem } = useCart();
  const { isSaved, toggleSavedItem } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = MOCK_DATA.products.filter(p => 
    searchQuery && (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );



  return (
    <div className="pb-0">
      {/* Header */}
      <Header onSearch={setSearchQuery} />



      {searchQuery ? (
        <div className="px-6 mt-8 max-w-7xl mx-auto min-h-screen">
          <h3 className="font-heading font-semibold text-xl mb-6">
            Search Results ({searchResults.length})
          </h3>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {searchResults.map(product => (
                <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 bg-white" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="h-40 bg-gray-50 relative p-4 group">
                    <button 
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50"
                      onClick={(e) => { e.stopPropagation(); toggleSavedItem(product); }}
                    >
                      <Heart size={16} className={isSaved(product.id) ? "fill-current" : ""} />
                    </button>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm line-clamp-1 mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="font-bold text-lg text-primary">${product.price}</p>
                        <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider">/ {product.unit}</p>
                      </div>
                      <button 
                        className="w-8 h-8 rounded-full border border-gray-200 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); addItem(product, 1); }}
                      >
                        +
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-5xl mb-4 text-gray-300">🔍</span>
              <p className="text-textMuted text-lg">No products found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Hero Section */}
          <section className="mt-8 mb-16 relative">
            <div className="bg-[#FAFAF7] rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
              <div className="md:w-1/2 z-10">
                <div className="inline-flex items-center gap-2 bg-green-50 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Leaf size={16} /> Eat Fresh, Live Better
                </div>
                <h1 className="text-5xl md:text-6xl font-heading font-bold text-textMain leading-[1.1] mb-6">
                  Freshness You <br/>Can <span className="text-primary">Trust</span>
                </h1>
                <p className="text-lg text-textMuted mb-8 max-w-md">
                  Handpicked organic fruits and vegetables, delivered fresh from local farms to your doorstep.
                </p>
                <button 
                  onClick={() => navigate('/categories')}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/30"
                >
                  Shop Now <ArrowRight size={20} />
                </button>
              </div>
              <div className="md:w-1/2 flex gap-4 h-[400px]">
                <img src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Fresh Fruits" className="w-1/2 object-cover rounded-3xl mt-8 shadow-xl" />
                <img src="https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Fresh Vegetables" className="w-1/2 object-cover rounded-3xl shadow-xl" />
              </div>
            </div>

            {/* Feature Strip - overlapping hero */}
            <div className="hidden md:flex absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-2xl shadow-lg border border-gray-100 p-6 justify-between items-center z-20">
              <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0 flex-1">
                <div className="w-12 h-12 rounded-full bg-green-50 text-primary flex items-center justify-center shrink-0">
                  <Leaf size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-textMain text-sm">100% Organic</h4>
                  <p className="text-xs text-textMuted mt-0.5">Chemical-free produce</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0 flex-1">
                <div className="w-12 h-12 rounded-full bg-green-50 text-primary flex items-center justify-center shrink-0">
                  <HomeIcon size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-textMain text-sm">Farm Fresh</h4>
                  <p className="text-xs text-textMuted mt-0.5">Direct from local farms</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 border-r border-gray-100 last:border-0 flex-1">
                <div className="w-12 h-12 rounded-full bg-green-50 text-primary flex items-center justify-center shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-textMain text-sm">Fast Delivery</h4>
                  <p className="text-xs text-textMuted mt-0.5">On-time at your door</p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-green-50 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-textMain text-sm">Best Quality</h4>
                  <p className="text-xs text-textMuted mt-0.5">Handpicked with care</p>
                </div>
              </div>
            </div>
          </section>

          {/* Spacer for overlapping strip */}
          <div className="h-16 hidden md:block"></div>

          {/* Shop by Category */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-heading font-bold">Shop by Category</h2>
              <button 
                onClick={() => navigate('/categories')}
                className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
              >
                View All Categories <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {MOCK_DATA.categories.map(cat => (
                <div 
                  key={cat.id} 
                  className="flex flex-col items-center cursor-pointer group" 
                  onClick={() => navigate(`/category/${cat.id}`)}
                >
                  <div className="w-20 h-20 rounded-full bg-gray-100 mb-3 overflow-hidden shadow-sm group-hover:shadow-md border-2 border-transparent group-hover:border-primary/20 transition-all group-hover:-translate-y-1">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="text-sm font-semibold text-textMain text-center leading-tight group-hover:text-primary transition-colors">{cat.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Picks */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-heading font-bold">Featured Picks</h2>
              <button 
                className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
                onClick={() => navigate('/categories')}
              >
                See All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {MOCK_DATA.products.slice(0, 5).map(product => (
                <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 bg-white" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="h-40 bg-gray-50 relative p-2 group">
                    <button 
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50"
                      onClick={(e) => { e.stopPropagation(); toggleSavedItem(product); }}
                    >
                      <Heart size={16} className={isSaved(product.id) ? "fill-current" : ""} />
                    </button>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm line-clamp-1 mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="font-bold text-lg text-primary">${product.price}</p>
                        <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider">/ {product.unit}</p>
                      </div>
                      <button 
                        className="w-8 h-8 rounded-full border border-gray-200 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); addItem(product, 1); }}
                      >
                        +
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Best Deals */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-heading font-bold">Best Deals of the Week</h2>
              <button 
                className="text-primary font-semibold text-sm hover:underline flex items-center gap-1"
                onClick={() => navigate('/categories')}
              >
                See All Deals <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {...MOCK_DATA.products[5], discount: '20% OFF'}, // Strawberries (mock as Blueberries in pic)
                {...MOCK_DATA.products[6], discount: '15% OFF'}, // Oranges (mock as Lemons)
                {...MOCK_DATA.products[17], discount: '15% OFF'}, // Tomatoes
                {...MOCK_DATA.products[7], discount: '20% OFF'}, // Spinach
              ].map(product => (
                <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 bg-white relative" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {product.discount}
                  </div>
                  <div className="h-40 bg-gray-50 relative p-2 group">
                    <button 
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50"
                      onClick={(e) => { e.stopPropagation(); toggleSavedItem(product); }}
                    >
                      <Heart size={16} className={isSaved(product.id) ? "fill-current" : ""} />
                    </button>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm line-clamp-1 mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="font-bold text-lg text-primary">${(product.price * 0.8).toFixed(2)}</p>
                        <p className="text-[10px] text-textMuted font-medium uppercase tracking-wider line-through">${product.price} / {product.unit}</p>
                      </div>
                      <button 
                        className="w-8 h-8 rounded-full border border-gray-200 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); addItem(product, 1); }}
                      >
                        +
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Banners Grid */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F0F7F4] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer">
              <div className="relative z-10 w-2/3 flex flex-col h-full">
                <div>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                    <Leaf size={16} /> Subscribe & Save
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-textMain leading-tight">Get up to 20% off on weekly subscriptions</h3>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white w-[160px] py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all mt-auto">
                  Subscribe Now <ArrowRight size={16} />
                </button>
              </div>
              <img src="https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Box" className="absolute -bottom-10 -right-10 w-56 aspect-square object-cover rounded-full group-hover:scale-105 transition-transform duration-500 shadow-xl" />
            </div>

            <div className="bg-[#Fdf4ed] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer">
              <div className="relative z-10 w-2/3 flex flex-col h-full">
                <div>
                  <div className="inline-flex items-center gap-2 text-red-500 font-semibold text-sm mb-4">
                    <span className="text-lg">🍓</span> Seasonal Special
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-textMain leading-tight">Fresh picks of the season just for you</h3>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white w-[160px] py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all mt-auto">
                  Shop Now <ArrowRight size={16} />
                </button>
              </div>
              <img src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Basket" className="absolute -bottom-10 -right-10 w-56 aspect-square object-cover rounded-full group-hover:scale-105 transition-transform duration-500 shadow-xl" />
            </div>

            <div className="bg-[#Edf5ee] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer">
              <div className="relative z-10 w-3/4 flex flex-col h-full">
                <div>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                    <Star size={16} className="fill-accent text-accent" /> Earn Rewards
                  </div>
                  <h3 className="text-2xl font-heading font-bold mb-4 text-textMain leading-tight">Refer a friend &<br/>give $10, get $10</h3>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white w-[160px] py-2.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all mt-auto">
                  Invite Now <ArrowRight size={16} />
                </button>
              </div>
              <img src="/refer-gift.jpg" alt="Gift Box" className="absolute -bottom-10 -right-10 w-56 aspect-square object-cover rounded-full bg-white group-hover:scale-105 transition-transform duration-500 shadow-xl" />
            </div>
          </section>



          {/* Farms */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-heading font-bold">Fresh From the Farm</h2>
              <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                See All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {MOCK_DATA.farms.map(farm => (
                <div key={farm.id} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer bg-white">
                  <div className="h-40 overflow-hidden relative">
                    <img src={farm.image} alt={farm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-textMain mb-1">{farm.name}</h4>
                    <p className="text-sm text-textMuted mb-3">{farm.location}</p>
                    <div className="flex items-center gap-1 text-primary font-bold text-sm">
                      {farm.rating} <Star size={14} className="fill-accent text-accent" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>



        </div>
      )}
      <FeaturesStrip />
    </div>
  );
}
