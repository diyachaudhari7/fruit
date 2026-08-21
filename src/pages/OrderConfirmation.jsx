import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Check, ClipboardList, CalendarDays, MapPin, ShoppingCart, User } from 'lucide-react';

export function OrderConfirmation() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartItemsCount = cart.items.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-body">

      {/* Main Content */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-6 sm:px-8 py-12 flex flex-col items-center">

        {/* Graphic */}
        <div className="relative mb-6 mt-8">
          {/* Confetti Elements */}
          <div className="absolute -top-4 -left-6 w-2 h-4 bg-yellow-400 rotate-45 rounded-sm"></div>
          <div className="absolute top-8 -left-10 w-2 h-2 bg-orange-400 rounded-full"></div>
          <div className="absolute top-16 -left-8 w-3 h-2 bg-[#16A34A] -rotate-12 rounded-sm opacity-60"></div>

          <div className="absolute -top-6 right-2 w-2 h-3 bg-[#16A34A] rotate-[30deg] rounded-sm"></div>
          <div className="absolute top-4 -right-10 w-2 h-4 bg-yellow-400 -rotate-45 rounded-sm"></div>
          <div className="absolute top-16 -right-6 w-2 h-2 bg-red-400 rounded-full"></div>
          <div className="absolute bottom-0 -right-2 w-2 h-2 bg-[#16A34A] rounded-full opacity-60"></div>

          {/* Main Circle */}
          <div className="w-24 h-24 bg-[#298E3A] rounded-full flex items-center justify-center shadow-lg relative z-10">
            <Check size={48} className="text-white" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1a202c] mb-2 text-center">
          Order Placed Successfully!
        </h2>
        <p className="text-[#4a5568] text-base mb-10 text-center">
          Thank you for shopping with Freshly.
        </p>

        {/* Order Details Card */}
        <div className="w-full bg-white border border-gray-100 rounded-xl px-6 sm:px-8 py-3 sm:py-4 shadow-sm mb-8">

          {/* Row 1 */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <ClipboardList size={20} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-textMain">Order ID</span>
            </div>
            <span className="text-sm font-bold text-textMain">#ORD-5678</span>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-textMain">Estimated Delivery</span>
            </div>
            <span className="text-sm font-bold text-[#16A34A]">Today, 4:00 PM</span>
          </div>

          {/* Row 3 */}
          <div className="flex items-start justify-between py-2">
            <div className="flex items-center gap-3 mt-0.5">
              <MapPin size={20} className="text-[#16A34A]" />
              <span className="text-sm font-medium text-textMain">Delivery Address</span>
            </div>
            <div className="text-right text-sm font-bold text-textMain max-w-[200px] sm:max-w-none">
              <p>123 Fresh Valley Road, Apartment 4B</p>
              <p>Green City, GC 10020</p>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm flex flex-col gap-3">
          <button
            className="w-full bg-[#298E3A] hover:bg-[#1E732B] text-white py-3.5 rounded-lg font-bold text-sm transition-colors shadow-sm"
            onClick={() => navigate('/tracking/ORD-5678')}
          >
            Track Order
          </button>
          <button
            className="w-full bg-white border border-[#298E3A] text-[#298E3A] hover:bg-green-50 py-3.5 rounded-lg font-bold text-sm transition-colors"
            onClick={() => navigate('/home')}
          >
            Continue Shopping
          </button>
        </div>

      </main>
    </div>
  );
}
