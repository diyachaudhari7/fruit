import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_DATA } from '../data/mockData';
import { Button } from '../components/ui/Button';
import { 
  ChevronRight, 
  ShoppingCart, 
  Star, 
  Leaf, 
  Truck, 
  ShieldCheck, 
  CheckCircle,
  Maximize2,
  ChevronDown,
  Droplet,
  HeartHandshake,
  RotateCcw,
  MapPin,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Header } from '../components/Header';
import { FeaturesStrip } from '../components/FeaturesStrip';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isSaved, toggleSavedItem } = useWishlist();
  const product = MOCK_DATA.products.find(p => p.id === id);
  const category = MOCK_DATA.categories.find(c => c.id === product?.categoryId);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col font-body">
        <Header />
        <div className="flex-1 flex items-center justify-center font-heading font-bold text-xl text-textMuted">
          Product not found
        </div>
        <FeaturesStrip />
      </div>
    );
  }



  const handleAddToCart = () => {
    addItem(product, qty);
  };

  const isOrganic = product.name.toLowerCase().includes('organic');
  const originalPrice = (product.price * 1.3).toFixed(2); // Mock original price 30% higher
  const discountPercent = 23;

  return (
    <div className="min-h-screen bg-white flex flex-col font-body">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-textMuted mb-8">
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/home')}>Home</span>
          <ChevronRight size={14} />
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate(`/category/${category?.id}`)}>{category?.name || 'Fresh Items'}</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-textMain">{product.name}</span>
        </div>

        {/* Top Section: Gallery and Info */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 mb-12">
          
          {/* Left: Image Gallery */}
          <div className="lg:w-1/2 flex gap-4">
            {/* Main Image */}
            <div className="flex-1 bg-gray-50 rounded-3xl relative overflow-hidden aspect-square border border-gray-100 p-4 group">
              {isOrganic && (
                <div className="absolute top-6 right-6 z-10 bg-white text-primary px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-green-50">
                  <Leaf size={14} /> Organic
                </div>
              )}
              <button 
                className="absolute top-6 left-6 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50"
                onClick={(e) => { e.stopPropagation(); toggleSavedItem(product); }}
              >
                <Heart size={20} className={isSaved(product.id) ? "fill-current" : ""} />
              </button>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl drop-shadow-sm" />
              <button className="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-md hover:text-primary transition-colors">
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="mb-2">
              <span className="bg-green-50 text-primary px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-max border border-green-100">
                <Leaf size={12} /> Fresh & Organic
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-heading font-bold text-textMain mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 text-sm mb-6">
              <div className="flex items-center text-yellow-400 gap-0.5">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
              </div>
              <span className="font-bold text-textMain">4.8</span>
              <span className="text-textMuted">(128 reviews)</span>
              <span className="text-gray-300">•</span>
              <span className="text-textMuted font-medium">250+ bought this week</span>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)} <span className="text-sm text-textMuted font-medium">/ {product.unit}</span></p>
            </div>
            <div className="flex items-center gap-3 mb-6">
               <p className="text-sm text-textMuted line-through font-medium">${originalPrice}</p>
               <span className="bg-green-50 text-primary px-2 py-0.5 rounded text-xs font-bold">{discountPercent}% OFF</span>
            </div>

            <p className="text-textMuted text-[15px] leading-relaxed mb-6">
              Crisp, juicy and naturally sweet organic apples. Handpicked from local orchards and packed with essential nutrients. Perfect for a healthy lifestyle.
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-1.5 text-xs font-bold text-textMain">
                <Leaf size={16} className="text-primary" /> 100% Organic
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-textMain">
                <ShieldCheck size={16} className="text-primary" /> No Pesticides
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-textMain">
                <CheckCircle size={16} className="text-primary" /> Rich in Fiber
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-textMain">
                <Droplet size={16} className="text-primary" /> Fresh & Crunchy
              </div>
            </div>

            {/* Add to Cart Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-4">
              <div className="flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full sm:w-auto">
                  <p className="text-xs font-bold text-textMain mb-2">Quantity</p>
                  <div className="flex items-center border border-gray-200 rounded-xl h-12 bg-white w-full sm:w-32">
                    <button 
                      className="w-10 h-full flex items-center justify-center font-bold text-gray-500 hover:text-primary transition-colors"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                    >−</button>
                    <span className="flex-1 text-center text-sm font-bold text-textMain">{qty}</span>
                    <button 
                      className="w-10 h-full flex items-center justify-center font-bold text-gray-500 hover:text-primary transition-colors"
                      onClick={() => setQty(qty + 1)}
                    >+</button>
                  </div>
                </div>
                


                <Button className="w-full sm:w-auto h-12 px-8 shadow-md rounded-xl font-bold flex-1 md:flex-none" onClick={handleAddToCart}>
                  <ShoppingCart size={18} className="mr-2" /> Add to Cart
                </Button>
              </div>
            </div>

            {/* Delivery Info Card */}
            <div className="bg-[#F4FBF5] rounded-2xl p-4 flex items-center justify-between border border-green-50">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm shrink-0">
                   <Truck size={18} />
                 </div>
                 <div>
                   <p className="text-xs font-bold text-primary mb-0.5">Free delivery on orders above $49</p>
                   <p className="text-[10px] text-textMuted font-medium">Delivery by <strong className="text-textMain font-bold">Tomorrow, 21 May</strong></p>
                 </div>
               </div>
            </div>

          </div>
        </div>



        {/* Bottom Section: Details & Upsell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Details Table */}
          <div className="lg:col-span-4">
            <h3 className="font-heading font-bold text-lg text-textMain mb-6">Product Details</h3>
            <div className="space-y-4">
              <div className="flex text-sm border-b border-gray-50 pb-2">
                <span className="w-32 font-bold text-textMain">Variety</span>
                <span className="text-textMuted">–</span>
                <span className="flex-1 text-textMuted ml-4">Fuji Apples</span>
              </div>
              <div className="flex text-sm border-b border-gray-50 pb-2">
                <span className="w-32 font-bold text-textMain">Origin</span>
                <span className="text-textMuted">–</span>
                <span className="flex-1 text-textMuted ml-4">Green Valley Farms, USA</span>
              </div>
              <div className="flex text-sm border-b border-gray-50 pb-2">
                <span className="w-32 font-bold text-textMain">Shelf Life</span>
                <span className="text-textMuted">–</span>
                <span className="flex-1 text-textMuted ml-4">7-10 days</span>
              </div>
              <div className="flex text-sm border-b border-gray-50 pb-2">
                <span className="w-32 font-bold text-textMain">Storage</span>
                <span className="text-textMuted">–</span>
                <span className="flex-1 text-textMuted ml-4">Store in a cool, dry place</span>
              </div>
              <div className="flex text-sm border-b border-gray-50 pb-2">
                <span className="w-32 font-bold text-textMain">Best For</span>
                <span className="text-textMuted">–</span>
                <span className="flex-1 text-textMuted ml-4">Snacking, Salads, Juices, Baking</span>
              </div>
            </div>
          </div>

          {/* Nutritional Benefits Table */}
          <div className="lg:col-span-3">
            <h3 className="font-heading font-bold text-lg text-textMain mb-6">Nutritional Benefits (Per 100g)</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                <span className="font-bold text-textMain">Calories</span>
                <span className="text-textMuted">52 kcal</span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                <span className="font-bold text-textMain">Carbohydrates</span>
                <span className="text-textMuted">13.8 g</span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                <span className="font-bold text-textMain">Fiber</span>
                <span className="text-textMuted">2.4 g</span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                <span className="font-bold text-textMain">Vitamin C</span>
                <span className="text-textMuted">4.6 mg</span>
              </div>
              <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                <span className="font-bold text-textMain">Potassium</span>
                <span className="text-textMuted">107 mg</span>
              </div>
            </div>
          </div>

          {/* You May Also Like */}
          <div className="lg:col-span-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading font-bold text-lg text-textMain">You May Also Like</h3>
              <button 
                className="text-xs font-bold text-primary hover:underline"
                onClick={() => navigate(product.categoryId ? `/category/${product.categoryId}` : '/categories')}
              >
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MOCK_DATA.products.slice(1, 5).map(p => (
                <div key={p.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden group cursor-pointer hover:border-primary/30 hover:shadow-md transition-all flex flex-col" onClick={() => navigate(`/product/${p.id}`)}>
                  <div className="aspect-square bg-gray-50 p-2 relative">
                    <button 
                      className="absolute top-2 left-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50"
                      onClick={(e) => { e.stopPropagation(); toggleSavedItem(p); }}
                    >
                      <Heart size={12} className={isSaved(p.id) ? "fill-current" : ""} />
                    </button>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h4 className="text-xs font-bold text-textMain line-clamp-1 mb-2">{p.name}</h4>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-xs font-bold text-primary">${p.price}<span className="text-[10px] text-textMuted font-medium">/{p.unit}</span></p>
                      <button 
                        className="w-5 h-5 rounded-full border border-gray-200 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-[10px]"
                        onClick={(e) => { e.stopPropagation(); addItem(p); }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      <FeaturesStrip />
    </div>
  );
}
