import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronLeft, Check, Truck, Home, Search, ShoppingCart, User, CalendarDays, MapPin, Phone, ChevronRight } from 'lucide-react';

export function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartItemsCount = cart.items.reduce((a, b) => a + b.quantity, 0);

  const orderId = id || 'ORD-5678';

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-body pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/home')}>
          <h1 className="text-2xl font-heading font-black text-[#16A34A] tracking-tight">Freshly</h1>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search for fruits, vegetables..." 
            className="w-full bg-gray-50 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/20"
          />
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div 
            className="flex flex-col items-center justify-center cursor-pointer text-textMain hover:text-[#16A34A] transition-colors relative"
            onClick={() => navigate('/cart')}
          >
            <div className="relative">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#16A34A] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium mt-1">Cart</span>
          </div>
          <div 
            className="flex flex-col items-center justify-center cursor-pointer text-textMain hover:text-[#16A34A] transition-colors"
            onClick={() => navigate('/profile')}
          >
            <User size={22} />
            <span className="text-[10px] font-medium mt-1">Profile</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        
        {/* Top Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <button onClick={() => navigate(-1)} className="hover:bg-gray-100 p-1.5 rounded-full transition-colors -ml-1.5">
                <ChevronLeft size={24} className="text-textMain" />
              </button>
              <h2 className="text-2xl font-bold text-textMain">Track Order</h2>
            </div>
            <p className="text-sm text-textMuted ml-11">Stay updated with your order status.</p>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-8 shadow-sm">
            <div>
              <p className="text-xs text-textMuted mb-1">Order ID</p>
              <p className="font-bold text-textMain">#{orderId}</p>
            </div>
            <div className="w-px h-10 bg-gray-100"></div>
            <div>
              <p className="text-xs text-textMuted mb-1">Estimated Delivery</p>
              <div className="flex items-center gap-2 font-bold text-[#16A34A]">
                <CalendarDays size={16} />
                Today, 4:00 PM
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 md:p-12 mb-8 shadow-sm overflow-x-auto md:overflow-visible">
          <div className="w-full">
            <div className="flex flex-row items-center justify-between relative gap-2 md:gap-0">
              
              {/* Connecting Lines (Horizontal) */}
              <div className="absolute top-4 md:top-6 left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10">
                <div className="absolute top-0 left-0 h-full bg-[#298E3A] w-[50%]"></div>
              </div>
              
              {/* Step 1: Order Placed */}
              <div className="flex flex-col items-center w-1/4 gap-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[#298E3A] rounded-full flex items-center justify-center shadow-sm">
                    <ShoppingCart className="text-white w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 md:w-5 md:h-5 bg-[#298E3A] rounded-full border-2 border-white flex items-center justify-center">
                    <Check className="text-white w-2 h-2 md:w-3 md:h-3" strokeWidth={3} />
                  </div>
                </div>
                <div className="text-center mt-1.5 md:mt-4">
                  <h4 className="font-bold text-[9px] sm:text-[10px] md:text-sm text-textMain mb-0.5 md:mb-1 leading-tight">Order Placed</h4>
                  <p className="text-[7px] sm:text-[8px] md:text-xs text-textMuted hidden sm:block">21 May, 10:00 AM</p>
                </div>
              </div>

              {/* Step 2: Confirmed */}
              <div className="flex flex-col items-center w-1/4 gap-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-[#298E3A] rounded-full flex items-center justify-center shadow-sm">
                    <Check className="text-white w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                  </div>
                </div>
                <div className="text-center mt-1.5 md:mt-4">
                  <h4 className="font-bold text-[9px] sm:text-[10px] md:text-sm text-textMain mb-0.5 md:mb-1 leading-tight">Confirmed</h4>
                  <p className="text-[7px] sm:text-[8px] md:text-xs text-textMuted hidden sm:block">21 May, 10:15 AM</p>
                </div>
              </div>

              {/* Step 3: Out for Delivery */}
              <div className="flex flex-col items-center w-1/4 gap-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-[#298E3A] ring-2 md:ring-4 ring-[#EAF5E9]">
                    <Truck className="text-[#298E3A] w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <div className="text-center mt-1.5 md:mt-4">
                  <h4 className="font-bold text-[9px] sm:text-[10px] md:text-sm text-textMain mb-0.5 md:mb-1 leading-tight">Out for Delivery</h4>
                  <p className="text-[7px] sm:text-[8px] md:text-xs text-textMuted hidden sm:block">21 May, 11:30 AM</p>
                </div>
              </div>

              {/* Step 4: Delivered */}
              <div className="flex flex-col items-center w-1/4 gap-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                    <Home className="text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
                <div className="text-center mt-1.5 md:mt-4">
                  <h4 className="font-bold text-[9px] sm:text-[10px] md:text-sm text-textMain mb-0.5 md:mb-1 leading-tight">Delivered</h4>
                  <p className="text-[7px] sm:text-[8px] md:text-xs text-textMuted hidden sm:block">Pending</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 mb-8 md:mb-10 shadow-sm">
          <div className="flex items-center gap-2 mb-3 md:mb-6 pb-3 md:pb-4 border-b border-gray-100">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#EAF5E9] text-[#16A34A] flex items-center justify-center shrink-0">
              <MapPin size={14} className="md:w-4 md:h-4" />
            </div>
            <h3 className="font-bold text-sm md:text-lg text-textMain">Delivery Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="md:pr-8 md:border-r border-gray-100">
              <p className="text-[10px] md:text-xs text-textMuted mb-1 md:mb-2">Delivery Address</p>
              <div className="text-xs md:text-sm font-medium text-textMain space-y-0.5 md:space-y-1">
                <p>123 Fresh Valley Road, Apartment 4B</p>
                <p>Green City, GC 10020</p>
                <p>+1 234 567 8900</p>
              </div>
            </div>

            <div className="md:px-4 md:border-r border-gray-100">
              <p className="text-[10px] md:text-xs text-textMuted mb-1 md:mb-2">Delivery Partner</p>
              <div className="text-xs md:text-sm font-medium text-textMain space-y-1 md:space-y-2">
                <p>Freshly Delivery</p>
                <p className="flex items-center gap-1.5 text-[#16A34A]">
                  <Phone size={12} className="md:w-[14px] md:h-[14px]" /> +1 987 654 3210
                </p>
              </div>
            </div>

            <div className="md:pl-4">
              <p className="text-[10px] md:text-xs text-textMuted mb-1 md:mb-2">Payment Method</p>
              <div className="text-xs md:text-sm font-medium text-textMain mb-2 md:mb-4">
                <p>Visa ending in 4242</p>
              </div>
              <p className="text-[10px] md:text-xs text-textMuted mb-0.5 md:mb-1">Total Amount</p>
              <p className="font-bold text-sm md:text-lg text-[#16A34A]">$17.46</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button 
            className="w-full max-w-sm bg-white border border-[#298E3A] text-[#298E3A] hover:bg-green-50 py-3 rounded-lg font-bold text-sm transition-colors"
            onClick={() => navigate('/home')}
          >
            Continue Shopping
          </button>
          <a href="#" className="text-xs text-textMuted hover:text-[#298E3A] transition-colors flex items-center gap-1 font-medium">
            Need help with your order? <span className="text-[#298E3A]">Contact Support <ChevronRight size={12} className="inline" /></span>
          </a>
        </div>

      </main>
    </div>
  );
}
