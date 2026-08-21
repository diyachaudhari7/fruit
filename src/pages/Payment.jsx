import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  ShieldCheck, ShoppingBag, Lock, Shield, CreditCard, Smartphone
} from 'lucide-react';
import { Header } from '../components/Header';
import { ProgressBanner } from '../components/ProgressBanner';
import { Button } from '../components/ui/Button';

export function Payment() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card'); 

  if (cart.items.length === 0) {
    return <div className="p-4 text-center mt-10">Cart is empty <br/><Button className="mt-4" onClick={() => navigate('/home')}>Go Home</Button></div>;
  }

  const deliveryFee = 2.00;
  const youSave = 0.00;
  const gst = cart.total * 0.05;
  const codFee = paymentMethod === 'cod' ? 1.00 : 0.00;
  const finalTotal = cart.total + deliveryFee + codFee + gst - youSave;

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-body pb-20">
      
      <Header />
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 pt-8">
        <ProgressBanner activeStep="payment" />
      </div>
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column */}
          <div className="flex-1">
            
            <div className="flex items-center gap-4 mb-8">
              <div>
                <h2 className="text-3xl font-heading font-extrabold text-textMain mb-1">Payment</h2>
                <p className="text-sm text-textMuted font-medium">Choose your preferred payment method.</p>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#16A34A] text-white flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="text-lg font-bold text-textMain">Payment Method</h3>
              </div>

              <div className="space-y-4">
                
                {/* Credit Card Option */}
                <div 
                  className={`border rounded-xl p-5 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[#16A34A] bg-[#F9FCF9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-5 h-5 rounded-full shrink-0 ${paymentMethod === 'card' ? 'border-[5px] border-[#16A34A]' : 'border border-gray-300'}`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${paymentMethod === 'card' ? 'bg-[#EAF5E9] text-[#16A34A]' : 'bg-gray-50 text-gray-400'}`}>
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-textMain text-sm mb-0.5">Credit / Debit Card</h4>
                      <p className="text-xs text-textMuted">Visa, Mastercard, AMEX</p>
                    </div>
                  </div>
                  
                  {/* Card Details Form - Only visible when selected */}
                  {paymentMethod === 'card' && (
                    <div className="pl-9 mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <label className="block text-xs font-bold text-textMain mb-1">Card Number</label>
                        <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A] bg-white" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-textMain mb-1">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A] bg-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-textMain mb-1">CVC</label>
                          <input type="text" placeholder="123" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A] bg-white" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-textMain mb-1">Cardholder Name</label>
                        <input type="text" placeholder="Name on card" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A] bg-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* UPI Option */}
                <div 
                  className={`border rounded-xl p-5 cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-[#16A34A] bg-[#F9FCF9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full shrink-0 ${paymentMethod === 'upi' ? 'border-[5px] border-[#16A34A]' : 'border border-gray-300'}`}></div>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#EAF5E9] text-[#16A34A]">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-textMain text-sm mb-0.5">UPI</h4>
                      <p className="text-xs text-textMuted">Pay via any UPI app</p>
                    </div>
                  </div>
                  
                  {/* UPI Details Form - Only visible when selected */}
                  {paymentMethod === 'upi' && (
                    <div className="pl-9 mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div>
                        <label className="block text-xs font-bold text-textMain mb-1">Enter UPI ID</label>
                        <input type="text" placeholder="example@upi" className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#16A34A] bg-white" />
                        <p className="text-[10px] text-textMuted mt-1">A payment request will be sent to this UPI ID.</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cash on Delivery */}
                <div 
                  className={`border rounded-xl p-5 flex items-center gap-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#16A34A] bg-[#F9FCF9]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className={`w-5 h-5 rounded-full shrink-0 ${paymentMethod === 'cod' ? 'border-[5px] border-[#16A34A]' : 'border border-gray-300'}`}></div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 text-gray-500 font-bold">
                    $
                  </div>
                  <div>
                    <h4 className="font-bold text-textMain text-sm mb-0.5">Cash on Delivery</h4>
                    <p className="text-xs text-textMuted">Pay when you receive the order. <span className="text-orange-500 font-bold block mt-0.5">+ $1.00 processing fee</span></p>
                  </div>
                </div>

              </div>
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
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-textMuted font-medium">
                    <span>COD Fee</span>
                    <span className="text-textMain">${codFee.toFixed(2)}</span>
                  </div>
                )}
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
                <Lock size={16} /> Place Order <span className="ml-1">→</span>
              </button>
              <p className="text-[10px] text-textMuted mt-2">
                By placing an order, you agree to our <a href="#" className="text-[#16A34A] hover:underline">Terms & Conditions</a>
              </p>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
