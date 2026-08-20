import React, { useState, useEffect } from 'react';
import { MOCK_DATA } from '../data/mockData';
import { Card, CardContent } from '../components/ui/Card';
import { Search, ShoppingCart, User, ArrowRight, Leaf, Home as HomeIcon, Truck, ShieldCheck, MapPin, FlaskConical, Clock, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { FeaturesStrip } from '../components/FeaturesStrip';
import { useCart } from '../context/CartContext';

export function Home() {
  const navigate = useNavigate();
  const { cart, addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const searchResults = MOCK_DATA.products.filter(p => 
    searchQuery && (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % MOCK_DATA.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + MOCK_DATA.testimonials.length) % MOCK_DATA.testimonials.length);
  };

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
                  <div className="h-40 bg-gray-50 relative p-4">
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
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/30">
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
              <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                View All Categories <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {MOCK_DATA.categories.map(cat => {
                const emojis = {
                  'c1': '🍎', 'c2': '🥬', 'c3': '🍍', 'c4': '📦', 
                  'c5': '🥚', 'c6': '🥩', 'c7': '🥖', 'c8': '🍾'
                };
                return (
                  <div 
                    key={cat.id} 
                    className="flex flex-col items-center cursor-pointer group bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all hover:-translate-y-1" 
                    onClick={() => navigate(`/category/${cat.id}`)}
                  >
                    <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                      <span className="text-xl font-heading font-bold text-primary">{cat.name[0]}</span>
                    </div>
                    <span className="text-xs font-semibold text-textMain text-center leading-tight mb-2 group-hover:text-primary transition-colors">{cat.name}</span>
                    <span className="text-lg mt-auto">{emojis[cat.id]}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Featured Picks */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-heading font-bold">Featured Picks</h2>
              <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                See All <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {MOCK_DATA.products.slice(0, 5).map(product => (
                <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-sm rounded-2xl cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 bg-white" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="h-40 bg-gray-50 relative p-2">
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

          {/* Banners Grid */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F0F7F4] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer">
              <div className="relative z-10 w-2/3">
                <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
                  <Leaf size={16} /> Subscribe & Save
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-textMain leading-tight">Get up to 20% off on weekly subscriptions</h3>
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all w-fit mt-6">
                  Subscribe Now <ArrowRight size={16} />
                </button>
              </div>
              <img src="https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Box" className="absolute -bottom-10 -right-10 w-56 object-cover rounded-full group-hover:scale-105 transition-transform duration-500 shadow-xl" />
            </div>

            <div className="bg-[#Fdf4ed] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer">
              <div className="relative z-10 w-2/3">
                <div className="inline-flex items-center gap-2 text-red-500 font-semibold text-sm mb-4">
                  <span className="text-lg">🍓</span> Seasonal Special
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4 text-textMain leading-tight">Fresh picks of the season just for you</h3>
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition-all w-fit mt-6">
                  Shop Now <ArrowRight size={16} />
                </button>
              </div>
              <img src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Basket" className="absolute -bottom-4 -right-4 w-48 object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-[#F5F8FA] rounded-3xl p-6 flex items-center gap-6 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Truck size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-textMain text-lg mb-1">Free Delivery</h4>
                  <p className="text-sm text-textMuted">On orders above $40 within city limits</p>
                </div>
              </div>
              <div className="bg-[#F5F8FA] rounded-3xl p-6 flex items-center gap-6 flex-1">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-textMain text-lg mb-1">Secure Payments</h4>
                  <p className="text-sm text-textMuted">Your transactions are safe and protected</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Freshly? */}
          <section className="mb-20">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Why Choose Freshly?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-primary flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <MapPin size={28} />
                </div>
                <h4 className="font-bold text-textMain mb-2">Local & Sustainable</h4>
                <p className="text-sm text-textMuted px-2">Supporting local farmers and sustainable practices</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-primary flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <FlaskConical size={28} />
                </div>
                <h4 className="font-bold text-textMain mb-2">Chemical Free</h4>
                <p className="text-sm text-textMuted px-2">No harmful chemicals, only natural goodness</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-primary flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <ShieldCheck size={28} />
                </div>
                <h4 className="font-bold text-textMain mb-2">Fresh Guarantee</h4>
                <p className="text-sm text-textMuted px-2">If it's not fresh, we make it right</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 text-primary flex items-center justify-center mx-auto mb-4 border border-green-100">
                  <Clock size={28} />
                </div>
                <h4 className="font-bold text-textMain mb-2">24/7 Support</h4>
                <p className="text-sm text-textMuted px-2">We're here to help anytime you need</p>
              </div>
            </div>
          </section>

          {/* Best Deals */}
          <section className="mb-16">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-heading font-bold">Best Deals of the Week</h2>
              <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
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
                  <div className="h-40 bg-gray-50 relative p-2">
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

          {/* Refer Banner */}
          <section className="mb-16">
            <div className="bg-[#Edf5ee] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative border border-green-100 shadow-sm">
              <div className="relative z-10 max-w-md mb-8 md:mb-0">
                <div className="inline-flex items-center gap-2 bg-white text-primary px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-sm border border-green-50">
                  <Star size={12} className="fill-accent text-accent" /> Earn Rewards
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Refer & Earn</h2>
                <p className="text-textMuted text-lg mb-8">Invite your friends and earn exciting rewards! Give $10, Get $10.</p>
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg shadow-primary/30">
                  Invite Now <ArrowRight size={20} />
                </button>
              </div>
              <div className="relative md:absolute right-0 md:-right-10 top-1/2 md:-translate-y-1/2 w-full md:w-1/2 flex justify-center md:justify-end pointer-events-none">
                 <img src="/refer-gift.jpg" alt="Gift Box" className="w-[300px] md:w-[450px] object-contain drop-shadow-2xl mix-blend-multiply scale-110" />
              </div>
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

          {/* Testimonials */}
          <section className="mb-20">
            <h2 className="text-2xl font-heading font-bold text-center mb-10">What Our Customers Say</h2>
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-green-50 transition-colors">
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-center px-8 flex-1">
                <div className="text-6xl text-green-100 font-serif leading-none mb-[-20px]">"</div>
                <p className="text-xl md:text-2xl font-medium text-textMain mb-8 leading-relaxed">
                  {MOCK_DATA.testimonials[currentTestimonial].quote}
                </p>
                <div className="text-6xl text-green-100 font-serif leading-none mt-[-40px] text-right inline-block float-right mr-10">"</div>
                <div className="clear-both"></div>
                <p className="font-bold text-textMain">- {MOCK_DATA.testimonials[currentTestimonial].author}</p>
                
                <div className="flex justify-center gap-2 mt-8">
                  {MOCK_DATA.testimonials.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`h-2 rounded-full transition-all ${idx === currentTestimonial ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`}
                    />
                  ))}
                </div>
              </div>

              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-green-50 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </section>

        </div>
      )}
      <FeaturesStrip />
    </div>
  );
}
