import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronRight, Trash2, Leaf, ShoppingCart, MapPin, CreditCard, CheckCircle, Info, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { FeaturesStrip } from '../components/FeaturesStrip';
import { MOCK_DATA } from '../data/mockData';

export function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem } = useCart();

  const deliveryFee = 2.99;
  const isFreeDelivery = cart.total >= 49;
  const freeDeliveryThreshold = 49;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - cart.total);
  const deliveryProgress = Math.min(100, (cart.total / freeDeliveryThreshold) * 100);
  
  const estimatedTax = cart.total * 0.08; // Assuming 8% tax for UI purposes
  const finalTotal = cart.total + (isFreeDelivery ? 0 : deliveryFee) + estimatedTax;

  const handleClearCart = () => {
    cart.items.forEach(item => removeItem(item.id));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body">
      <Header />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-textMuted mb-6">
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/home')}>Home</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-textMain">My Cart</span>
        </div>

        {/* Top Banner & Progress Tracker */}
        <div className="bg-[#Edf5ee] rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-green-50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm overflow-hidden flex-shrink-0 p-2 relative">
              {/* Using a placeholder for the basket image */}
              <img src="https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Fresh Basket" className="w-full h-full object-cover rounded-full" />
              <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full border-2 border-white">
                <Leaf size={12} />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-primary mb-1">Freshness delivered to your door!</h2>
              <p className="text-textMuted text-sm">Add more fresh items and enjoy healthy living.</p>
            </div>
          </div>
          
          {/* Progress Tracker */}
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                <ShoppingCart size={18} />
              </div>
              <span className="text-xs font-bold text-primary">Cart</span>
            </div>
            <div className="w-8 md:w-12 h-px bg-gray-300 -mt-6"></div>
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="w-10 h-10 rounded-full bg-white text-gray-400 border border-gray-200 flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <span className="text-xs font-medium text-textMuted">Address</span>
            </div>
            <div className="w-8 md:w-12 h-px bg-gray-300 -mt-6"></div>
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="w-10 h-10 rounded-full bg-white text-gray-400 border border-gray-200 flex items-center justify-center">
                <CreditCard size={18} />
              </div>
              <span className="text-xs font-medium text-textMuted">Payment</span>
            </div>
            <div className="w-8 md:w-12 h-px bg-gray-300 -mt-6"></div>
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="w-10 h-10 rounded-full bg-white text-gray-400 border border-gray-200 flex items-center justify-center">
                <CheckCircle size={18} />
              </div>
              <span className="text-xs font-medium text-textMuted text-center leading-tight">Order<br/>Placed</span>
            </div>
          </div>
        </div>

        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart size={40} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-textMain mb-2">Your cart is empty</h2>
            <p className="text-textMuted mb-8 max-w-md">Looks like you haven't added any fresh items yet. Start shopping to fill it up!</p>
            <button 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md"
              onClick={() => navigate('/home')}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Cart Items */}
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                  <h2 className="text-xl font-heading font-bold text-textMain">My Cart ({cart.items.reduce((a, b) => a + b.quantity, 0)} items)</h2>
                  <button onClick={handleClearCart} className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
                    <Trash2 size={16} /> Clear Cart
                  </button>
                </div>

                <div className="space-y-6">
                  {cart.items.map((item, index) => (
                    <div key={item.id} className={`flex flex-col sm:flex-row items-center gap-6 ${index !== cart.items.length - 1 ? 'border-b border-gray-50 pb-6' : ''}`}>
                      <div className="w-full sm:w-24 h-32 sm:h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 p-2">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      </div>
                      
                      <div className="flex-1 flex flex-col w-full">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-base text-textMain">{item.name}</h3>
                              {item.name.toLowerCase().includes('organic') && (
                                <span className="bg-green-50 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-green-100">
                                  <Leaf size={10} /> Organic
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-textMuted font-medium">{item.unit === 'kg' ? '1 kg' : '1 ' + item.unit} • Farm fresh</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <span className="sr-only">Remove item</span>
                            ×
                          </button>
                        </div>
                        
                        <div className="flex items-end justify-between mt-auto">
                          <div>
                            <p className="font-bold text-primary">${item.price.toFixed(2)} <span className="text-[10px] text-textMuted uppercase font-medium">/ {item.unit}</span></p>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="flex items-center border border-gray-200 rounded-full h-9 bg-white">
                              <button 
                                className="w-9 h-full flex items-center justify-center font-bold text-gray-500 hover:text-primary transition-colors"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >−</button>
                              <span className="w-6 text-center text-sm font-bold text-textMain">{item.quantity}</span>
                              <button 
                                className="w-9 h-full flex items-center justify-center font-bold text-gray-500 hover:text-primary transition-colors"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >+</button>
                            </div>
                            <p className="font-bold text-lg text-textMain w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Delivery Progress */}
              <div className="bg-[#F0F7F4] rounded-2xl p-6 border border-green-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <Leaf size={20} />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-sm font-bold text-textMain">
                      {isFreeDelivery ? 'You have unlocked FREE DELIVERY!' : `Add $${amountToFreeDelivery.toFixed(2)} more to get FREE DELIVERY!`}
                    </p>
                    {!isFreeDelivery && <span className="text-xs font-semibold text-textMuted">${freeDeliveryThreshold.toFixed(2)} to go</span>}
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${deliveryProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Summary & Upsell */}
            <div className="w-full lg:w-[380px] flex flex-col gap-6">
              
              {/* Order Summary */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-heading font-bold text-textMain mb-6">Order Summary</h2>
                
                <div className="space-y-4 text-sm mb-6 border-b border-gray-50 pb-6">
                  <div className="flex justify-between">
                    <span className="text-textMuted font-medium">Subtotal ({cart.items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                    <span className="font-semibold text-textMain">${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-textMuted font-medium">Delivery Fee</span>
                    <div className="flex items-center gap-2">
                      {isFreeDelivery ? (
                        <>
                          <span className="text-gray-400 line-through text-xs">${deliveryFee.toFixed(2)}</span>
                          <span className="font-bold text-primary">Free</span>
                        </>
                      ) : (
                        <span className="font-semibold text-textMain">${deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-textMuted font-medium flex items-center gap-1">
                      Estimated Tax <Info size={14} className="text-gray-400" />
                    </span>
                    <span className="font-semibold text-textMain">${estimatedTax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-lg font-bold text-textMain">Total</span>
                  <span className="text-3xl font-heading font-bold text-primary">${finalTotal.toFixed(2)}</span>
                </div>

                <button 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 mb-4"
                  onClick={() => navigate('/checkout')}
                >
                  <ShoppingCart size={20} /> Proceed to Checkout <ChevronRight size={20} />
                </button>
                
                <p className="text-xs text-textMuted text-center flex items-center justify-center gap-1 font-medium">
                  <ShieldCheck size={14} className="text-primary" /> Your transactions are secure and protected
                </p>
              </div>

              {/* You May Also Like */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-heading font-bold text-textMain">You May Also Like</h3>
                  <button className="text-xs font-bold text-primary flex items-center hover:underline" onClick={() => navigate('/home')}>
                    See All <ChevronRight size={14} />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {MOCK_DATA.products.slice(6, 9).map(product => (
                    <div key={product.id} className="flex flex-col group cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                      <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-2 p-1 border border-transparent group-hover:border-primary/20 transition-colors">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <h4 className="text-xs font-bold text-textMain line-clamp-1 mb-0.5">{product.name}</h4>
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-[10px] font-bold text-primary">${product.price.toFixed(2)}<span className="text-[8px] text-textMuted font-normal">/{product.unit}</span></p>
                        <button className="w-5 h-5 rounded-full border border-gray-200 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-xs">
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>

      <FeaturesStrip />
    </div>
  );
}
