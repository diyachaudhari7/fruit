import React, { useState } from 'react';
import { useNavigate, Link, useParams, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { FeaturesStrip } from '../components/FeaturesStrip';
import { MOCK_DATA } from '../data/mockData';
import { ChevronRight, LayoutGrid, Apple, Carrot, Star, Package, Egg, Drumstick, Croissant, Coffee, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Card, CardContent } from '../components/ui/Card';

const IconMap = {
  'Apple': Apple,
  'Carrot': Carrot,
  'Star': Star,
  'Package': Package,
  'Egg': Egg,
  'Drumstick': Drumstick,
  'Croissant': Croissant,
  'Coffee': Coffee
};

export function Categories() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cart, addItem } = useCart();
  const { isSaved, toggleSavedItem } = useWishlist();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  React.useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);
  
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [bestSellerOnly, setBestSellerOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  const currentCategory = MOCK_DATA.categories.find(c => c.id === id);
  
  const isFiltering = maxPrice < 100 || selectedDietary.length > 0 || inStockOnly || bestSellerOnly || sortBy !== 'featured' || searchQuery;
  
  let baseProducts = MOCK_DATA.products;
  if (id) {
    baseProducts = baseProducts.filter(p => p.categoryId === id);
  }
  
  let displayedProducts = baseProducts.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (p.price > maxPrice) return false;
    if (selectedDietary.length > 0) {
      if (!selectedDietary.every(diet => p.dietary?.includes(diet))) return false;
    }
    if (inStockOnly && !p.inStock) return false;
    if (bestSellerOnly && !p.bestSeller) return false;
    return true;
  });
  
  if (sortBy === 'az') {
    displayedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'za') {
    displayedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  const clearFilters = () => {
    setMaxPrice(100);
    setSelectedDietary([]);
    setInStockOnly(false);
    setBestSellerOnly(false);
    setSortBy('featured');
    setSearchQuery('');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-0">
      <Header onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-textMuted mb-6">
          <Link to="/home" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-textMain font-medium">Categories</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-textMain mb-2">
            {currentCategory ? currentCategory.name : 'All Categories'}
          </h1>
          <p className="text-textMuted">
            {currentCategory || isFiltering ? `${displayedProducts.length} items available.` : 'Explore our wide range of fresh and organic products.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            {/* Shop by Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
              <h3 className="font-bold text-textMain mb-4">Shop by</h3>
              <div className="flex flex-col space-y-1">
                <button 
                  onClick={() => navigate('/categories')}
                  className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg font-medium text-sm transition-colors ${!id ? 'bg-green-50 text-primary' : 'text-textMuted hover:bg-gray-50 hover:text-primary'}`}
                >
                  <LayoutGrid size={18} />
                  All Categories
                </button>
                {MOCK_DATA.categories.map(cat => {
                  const IconComponent = IconMap[cat.icon];
                  const isActive = id === cat.id;
                  return (
                    <button 
                      key={cat.id}
                      onClick={() => navigate(`/category/${cat.id}`)}
                      className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-green-50 text-primary font-medium' : 'text-textMuted hover:bg-gray-50 hover:text-primary'}`}
                    >
                      {IconComponent && <IconComponent size={18} />}
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-textMain">Filters</h3>
                <button onClick={clearFilters} className="text-primary text-xs font-medium hover:underline">Clear All</button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-textMain mb-3">Max Price: ${maxPrice}</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between items-center text-sm mt-2">
                  <div className="border border-gray-200 rounded px-3 py-1 w-20 text-center text-textMuted">$0</div>
                  <div className="border border-gray-200 rounded px-3 py-1 w-20 text-center text-textMuted">$100</div>
                </div>
              </div>

              {/* Dietary Preference */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-textMain mb-3">Dietary Preference</h4>
                <div className="space-y-2 text-sm text-textMuted">
                  {['Organic', 'Gluten Free', 'Vegan', 'Non-GMO'].map(diet => (
                    <label key={diet} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                      <input 
                        type="checkbox" 
                        checked={selectedDietary.includes(diet)}
                        onChange={() => {
                          setSelectedDietary(prev => 
                            prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
                          );
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                      />
                      {diet}
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-sm font-semibold text-textMain mb-3">Availability</h4>
                <div className="space-y-2 text-sm text-textMuted">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <input 
                      type="checkbox" 
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                    />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <input 
                      type="checkbox" 
                      checked={bestSellerOnly}
                      onChange={(e) => setBestSellerOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                    />
                    Best Seller
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="flex justify-between items-center mb-6">
              <div className="hidden md:block">
                <span className="bg-green-100 text-primary font-semibold text-xs px-3 py-1 rounded">
                  {currentCategory ? currentCategory.name : 'All Categories'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm ml-auto">
                <span className="text-textMuted">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-md px-3 py-1.5 bg-white text-textMain outline-none cursor-pointer focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="featured">Featured</option>
                  <option value="az">A to Z</option>
                  <option value="za">Z to A</option>
                </select>
              </div>
            </div>

            {/* Main Grid */}
            {id || isFiltering ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      <div className="h-40 bg-gray-100 relative overflow-hidden">
                        <button 
                          className="absolute top-2 left-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50"
                          onClick={(e) => { e.stopPropagation(); toggleSavedItem(product); }}
                        >
                          <Heart size={16} className={isSaved(product.id) ? "fill-current" : ""} />
                        </button>
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
                            className="w-9 h-9 rounded-full bg-green-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
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
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-textMuted">No products found matching your filters.</p>
                    <button onClick={clearFilters} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">Clear Filters</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_DATA.categories.map(category => (
                  <div 
                    key={category.id} 
                    onClick={() => navigate(`/category/${category.id}`)}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group flex flex-col h-full"
                  >
                    <div className="h-48 bg-gray-50 relative p-4 flex items-center justify-center overflow-hidden">
                      {/* Background blob to mimic mockup aesthetic */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-orange-50 opacity-50 z-0"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-100/50 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform duration-500"></div>
                      
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover rounded-xl relative z-10 group-hover:scale-105 transition-transform duration-500 shadow-sm"
                      />
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-textMain mb-1">{category.name}</h3>
                      <p className="text-sm text-textMuted mb-4">{category.itemCount} items</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all gap-1">
                        Shop Now <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <FeaturesStrip />
      </div>
    </div>
  );
}
