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
    <div className="bg-gray-50 pb-0">
      <Header onSearch={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-2 sm:px-6 pt-2 pb-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-[10px] sm:text-sm text-textMuted mb-2 sm:mb-6">
          <Link to="/home" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-textMain font-medium">Categories</span>
        </div>

        {/* Title */}
        <div className="mb-8 hidden md:block">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-textMain mb-2">
            {currentCategory ? currentCategory.name : 'All Categories'}
          </h1>
          <p className="text-textMuted">
            {currentCategory || isFiltering ? `${displayedProducts.length} items available.` : 'Explore our wide range of fresh and organic products.'}
          </p>
        </div>

        <div className="flex flex-row gap-2 sm:gap-8 items-start relative">
          {/* Left Sidebar */}
          <div className="w-[35%] sm:w-1/3 md:w-64 shrink-0 sticky md:static top-[70px] md:top-auto max-h-[calc(100vh-80px)] md:max-h-none overflow-y-auto md:overflow-visible" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {/* Shop by Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 sm:p-5 mb-2 sm:mb-6">
              <h3 className="font-bold text-textMain mb-2 sm:mb-4 text-[10px] sm:text-base">Shop by</h3>
              <div className="flex flex-col space-y-0.5 sm:space-y-1">
                <button 
                  onClick={() => navigate('/categories')}
                  className={`flex items-center gap-1 sm:gap-3 w-full text-left px-1.5 sm:px-3 py-1 sm:py-2 rounded-lg font-medium text-[8px] sm:text-sm transition-colors ${!id ? 'bg-green-50 text-primary' : 'text-textMuted hover:bg-gray-50 hover:text-primary'}`}
                >
                  <LayoutGrid className="w-3 h-3 sm:w-[18px] sm:h-[18px]" />
                  <span className="line-clamp-1">All Categories</span>
                </button>
                {MOCK_DATA.categories.map(cat => {
                  const IconComponent = IconMap[cat.icon];
                  const isActive = id === cat.id;
                  return (
                    <button 
                      key={cat.id}
                      onClick={() => navigate(`/category/${cat.id}`)}
                      className={`flex items-center gap-1 sm:gap-3 w-full text-left px-1.5 sm:px-3 py-1 sm:py-2 rounded-lg text-[8px] sm:text-sm transition-colors ${isActive ? 'bg-green-50 text-primary font-medium' : 'text-textMuted hover:bg-gray-50 hover:text-primary'}`}
                    >
                      {IconComponent && <IconComponent className="w-3 h-3 sm:w-[18px] sm:h-[18px] shrink-0" />}
                      <span className="line-clamp-1">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 sm:p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4 gap-1 sm:gap-0">
                <h3 className="font-bold text-textMain text-[10px] sm:text-base">Filters</h3>
                <button onClick={clearFilters} className="text-primary text-[8px] sm:text-xs font-medium hover:underline">Clear</button>
              </div>

              {/* Price Range */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-[9px] sm:text-sm font-semibold text-textMain mb-1.5 sm:mb-3 line-clamp-1">Max Price: ${maxPrice}</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-primary cursor-pointer h-1 sm:h-2"
                />
                <div className="flex justify-between items-center text-[8px] sm:text-sm mt-1 sm:mt-2">
                  <div className="border border-gray-200 rounded px-1 sm:px-3 py-0.5 sm:py-1 text-center text-textMuted">$0</div>
                  <div className="border border-gray-200 rounded px-1 sm:px-3 py-0.5 sm:py-1 text-center text-textMuted">$100</div>
                </div>
              </div>

              {/* Dietary Preference */}
              <div className="mb-4 sm:mb-6">
                <h4 className="text-[9px] sm:text-sm font-semibold text-textMain mb-1.5 sm:mb-3">Dietary</h4>
                <div className="space-y-1 sm:space-y-2 text-[8px] sm:text-sm text-textMuted">
                  {['Organic', 'Gluten Free', 'Vegan', 'Non-GMO'].map(diet => (
                    <label key={diet} className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary leading-tight">
                      <input 
                        type="checkbox" 
                        checked={selectedDietary.includes(diet)}
                        onChange={() => {
                          setSelectedDietary(prev => 
                            prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
                          );
                        }}
                        className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                      />
                      {diet}
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="text-[9px] sm:text-sm font-semibold text-textMain mb-1.5 sm:mb-3">Availability</h4>
                <div className="space-y-1 sm:space-y-2 text-[8px] sm:text-sm text-textMuted">
                  <label className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary leading-tight">
                    <input 
                      type="checkbox" 
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                    />
                    In Stock
                  </label>
                  <label className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-primary leading-tight">
                    <input 
                      type="checkbox" 
                      checked={bestSellerOnly}
                      onChange={(e) => setBestSellerOnly(e.target.checked)}
                      className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" 
                    />
                    Best Seller
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden">
            {/* Sort Dropdown */}
            <div className="flex justify-between items-center mb-2 sm:mb-6">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer rounded-xl sm:rounded-2xl" onClick={() => navigate(`/product/${product.id}`)}>
                      <div className="h-24 sm:h-40 bg-gray-100 relative overflow-hidden">
                        <button 
                          className="absolute top-1 sm:top-2 left-1 sm:left-2 w-5 h-5 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50"
                          onClick={(e) => { e.stopPropagation(); toggleSavedItem(product); }}
                        >
                          <Heart className={`w-2.5 h-2.5 sm:w-4 sm:h-4 ${isSaved(product.id) ? "fill-current" : ""}`} />
                        </button>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-white/90 backdrop-blur-sm px-1 sm:px-2 py-0.5 sm:py-1 rounded-md shadow-sm">
                          <p className="text-[8px] sm:text-xs font-bold text-primary flex items-center gap-0.5 sm:gap-1">★ {product.rating}</p>
                        </div>
                      </div>
                      <CardContent className="p-2 sm:p-4">
                        <h4 className="font-semibold text-textMain text-[9px] sm:text-sm line-clamp-1 mb-0.5 sm:mb-1">{product.name}</h4>
                        <p className="text-[7px] sm:text-xs text-textMuted line-clamp-1 mb-1 sm:mb-3">{product.description}</p>
                        
                        <div className="flex items-end justify-between mt-auto">
                          <div>
                            <p className="font-bold text-[10px] sm:text-lg text-primary leading-none">${product.price}</p>
                            <p className="text-[6px] sm:text-[10px] text-textMuted mt-0.5 sm:mt-1">per {product.unit}</p>
                          </div>
                          <button 
                            className="w-5 h-5 sm:w-9 sm:h-9 rounded-full bg-green-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              addItem(product, 1);
                            }}
                          >
                            <span className="text-[10px] sm:text-xl font-medium leading-none mb-0.5 sm:mb-1">+</span>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full py-6 sm:py-12 text-center">
                    <p className="text-textMuted text-xs sm:text-base">No products found matching your filters.</p>
                    <button onClick={clearFilters} className="mt-2 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-white text-[10px] sm:text-base rounded-lg hover:bg-primary/90 transition-colors">Clear Filters</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
                {MOCK_DATA.categories.map(category => (
                  <div 
                    key={category.id} 
                    onClick={() => navigate(`/category/${category.id}`)}
                    className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group flex flex-col h-full"
                  >
                    <div className="h-24 sm:h-48 bg-gray-50 relative p-2 sm:p-4 flex items-center justify-center overflow-hidden">
                      {/* Background blob to mimic mockup aesthetic */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-orange-50 opacity-50 z-0"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-100/50 rounded-full blur-2xl z-0 group-hover:scale-110 transition-transform duration-500"></div>
                      
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover rounded-lg sm:rounded-xl relative z-10 group-hover:scale-105 transition-transform duration-500 shadow-sm"
                      />
                    </div>
                    
                    <div className="p-2 sm:p-5 flex-1 flex flex-col">
                      <h3 className="text-[10px] sm:text-lg font-bold text-textMain mb-0.5 sm:mb-1 line-clamp-1">{category.name}</h3>
                      <p className="text-[8px] sm:text-sm text-textMuted mb-2 sm:mb-4">{category.itemCount} items</p>
                      
                      <div className="mt-auto pt-1.5 sm:pt-4 border-t border-gray-50 flex items-center text-primary font-semibold text-[8px] sm:text-sm group-hover:gap-2 transition-all gap-1">
                        Shop Now <ArrowRight className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-12 hidden md:block">
        <FeaturesStrip />
      </div>
    </div>
  );
}
