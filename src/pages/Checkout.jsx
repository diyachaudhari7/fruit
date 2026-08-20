import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ChevronLeft, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [addressSelected, setAddressSelected] = useState(true);

  if (cart.items.length === 0) {
    return <div className="p-4 text-center mt-10">Cart is empty <br/><Button className="mt-4" onClick={() => navigate('/home')}>Go Home</Button></div>;
  }

  const handlePlaceOrder = () => {
    // In a real app, this would be an API call
    clearCart();
    // Navigate to a success page
    navigate('/order-success');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft size={24} className="text-textMain" />
        </button>
        <h1 className="text-lg font-heading font-semibold text-textMain">Checkout</h1>
      </header>

      <div className="flex-1 p-4 pb-24 overflow-y-auto space-y-4 max-w-3xl mx-auto w-full">
        {/* Address Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-heading font-semibold flex items-center gap-2">
              <MapPin size={18} className="text-primary" /> Delivery Address
            </h3>
            <button className="text-sm text-primary font-medium">Change</button>
          </div>
          <div className="text-sm text-textMuted p-3 bg-gray-50 rounded-lg border border-gray-100">
            <p className="font-medium text-textMain mb-1">John Doe</p>
            <p>123 Fresh Valley Road, Apartment 4B</p>
            <p>Green City, GC 10020</p>
            <p className="mt-1">+1 234 567 8900</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-heading font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 mb-4">
            {cart.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-textMuted">{item.quantity}x {item.name}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-textMuted">
              <span>Subtotal</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-textMuted">
              <span>Delivery Fee</span>
              <span>$2.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-textMain pt-2 border-t mt-2">
              <span>Total</span>
              <span>${(cart.total + 2.0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-heading font-semibold mb-3">Payment Method</h3>
          <label className="flex items-center gap-3 p-3 bg-lightGreen/20 border border-primary/30 rounded-lg cursor-pointer">
            <input type="radio" name="payment" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
            <span className="font-medium text-sm">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex justify-center">
        <div className="w-full max-w-3xl">
          <Button className="w-full h-12 text-lg" onClick={handlePlaceOrder}>
            Place Order - ${(cart.total + 2.0).toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
}
