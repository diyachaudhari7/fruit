import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, Check, Edit2, Truck, Zap, ShoppingBag, Lock, Shield
} from 'lucide-react';
import { Header } from '../components/Header';
import { ProgressBanner } from '../components/ProgressBanner';
import { Button } from '../components/ui/Button';
import { MOCK_DATA } from '../data/mockData';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    name: 'Dramani John',
    street: '123 Fresh Valley Road, Apartment 4B',
    city: 'Green City, GC 10020',
    phone: '+1 234 567 8900'
  });

  if (cart.items.length === 0) {
    return <div className="p-4 text-center mt-10">Cart is empty <br/><Button className="mt-4" onClick={() => navigate('/home')}>Go Home</Button></div>;
  }

  const deliveryFee = 2.00;
  const youSave = 0.00;
  const gst = cart.total * 0.05;
  const finalTotal = cart.total + deliveryFee + gst - youSave;

  const handlePlaceOrder = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-body pb-20">
      
      <Header />
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-8">
        <ProgressBanner activeStep="address" />
      </div>
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column */}
          <div className="flex-1">
            
            <div className="flex items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-heading font-extrabold text-textMain mb-1">Checkout</h2>
                <p className="text-sm text-textMuted font-medium">Almost there! Review your order and details.</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="text-lg font-bold text-textMain">Delivery Address</h3>
                </div>
                {!isEditingAddress && (
                  <button 
                    onClick={() => setIsEditingAddress(true)}
                    className="text-sm font-bold text-[#16A34A] flex items-center gap-1 hover:underline"
                  >
                    <Edit2 size={14} /> Edit
                  </button>
                )}
              </div>

              {isEditingAddress ? (
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-textMain mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={addressDetails.name}
                      onChange={(e) => setAddressDetails({...addressDetails, name: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMain mb-1">Street Address</label>
                    <input 
                      type="text" 
                      value={addressDetails.street}
                      onChange={(e) => setAddressDetails({...addressDetails, street: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMain mb-1">City, Zip</label>
                    <input 
                      type="text" 
                      value={addressDetails.city}
                      onChange={(e) => setAddressDetails({...addressDetails, city: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-textMain mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={addressDetails.phone}
                      onChange={(e) => setAddressDetails({...addressDetails, phone: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A]" 
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      onClick={() => setIsEditingAddress(false)}
                      className="px-4 py-2 text-sm font-bold text-textMuted hover:text-textMain transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => setIsEditingAddress(false)}
                      className="px-5 py-2 bg-[#16A34A] hover:bg-[#15803d] text-white text-sm font-bold rounded-lg transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-[#16A34A] rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-green-600 transition-colors cursor-pointer">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#16A34A]"></div>
                  <div className="absolute top-5 right-5 w-5 h-5 rounded-full border-[5px] border-[#16A34A]"></div>
                  
                  <h4 className="font-bold text-textMain mb-1">{addressDetails.name}</h4>
                  <p className="text-sm text-textMuted mb-3">
                    {addressDetails.street}<br/>{addressDetails.city}
                  </p>
                  <p className="text-sm font-bold text-textMain flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-green-50 flex items-center justify-center">📱</span>
                    {addressDetails.phone}
                  </p>
                </div>
              )}
            </div>



            {/* Order Notes */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Edit2 size={18} className="text-[#16A34A]" />
                <h3 className="text-lg font-bold text-textMain">Order Notes <span className="text-textMuted font-medium text-sm">(Optional)</span></h3>
              </div>
              <textarea 
                placeholder="Add a note for your order..." 
                className="w-full border border-gray-200 rounded-xl p-4 text-sm resize-y min-h-[100px] outline-none focus:border-[#16A34A]"
              ></textarea>
            </div>
            
          </div>

          {/* Right Column (Summary) */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 sticky top-24">
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
                <div className="w-10 h-10 rounded-full bg-[#EAF5E9] text-[#16A34A] flex items-center justify-center shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <h3 className="text-lg font-bold text-textMain">Order Summary</h3>
              </div>

              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 shrink-0 overflow-hidden border border-gray-100 p-1">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-textMain mb-1">{item.name}</h4>
                        <p className="text-xs text-textMuted">{item.unit === 'kg' ? '1 kg' : item.unit === 'piece' ? '1 piece' : '500g'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-textMain mb-1">${item.price.toFixed(2)}</p>
                        <p className="text-xs text-textMuted">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-50 pt-4 space-y-3 text-sm mb-6">
                <div className="flex justify-between text-textMuted font-medium">
                  <span>Subtotal ({cart.items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                  <span className="text-textMain">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-textMuted font-medium">
                  <span>Delivery Fee</span>
                  <span className="text-textMain">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-textMuted font-medium">
                  <span>GST (5%)</span>
                  <span className="text-textMain">${gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-[#EAF5E9] text-[#16A34A] px-3 py-2 rounded-lg font-bold">
                  <span className="flex items-center gap-1.5"><Shield size={14} /> You Save</span>
                  <span>-${youSave.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6">
                <span className="text-lg font-bold text-textMain">Total Amount</span>
                <span className="text-2xl font-bold text-[#16A34A]">${finalTotal.toFixed(2)}</span>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-4 flex gap-3 border border-gray-100">
                <ShieldCheck size={24} className="text-[#16A34A] shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-textMain mb-0.5">Secure & Safe Payments</h4>
                  <p className="text-[10px] text-textMuted leading-tight">Your payment information is 100% secure</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EAF5E9] text-[#16A34A] flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-textMain">100% Secure Checkout</p>
              <p className="text-[11px] text-textMuted">SSL encrypted payments</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 w-full md:w-auto justify-end">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-textMuted uppercase tracking-wider mb-0.5">Total Payable</p>
              <p className="text-xl font-bold text-[#16A34A]">${finalTotal.toFixed(2)}</p>
            </div>
            
            <div className="flex flex-col items-center flex-1 sm:flex-none">
              <button 
                onClick={handlePlaceOrder}
                className="w-full sm:w-[280px] bg-[#298E3A] hover:bg-[#1E732B] text-white py-3.5 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-600/20"
              >
                Proceed to Payment <span className="ml-1">→</span>
              </button>
              <p className="text-[10px] text-textMuted mt-2">
                By proceeding, you agree to our <a href="#" className="text-[#16A34A] hover:underline">Terms & Conditions</a>
              </p>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
