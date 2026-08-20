import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';

export function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-lightGreen/30 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 text-primary">
        <CheckCircle size={48} />
      </div>
      <h1 className="text-3xl font-heading font-bold text-textMain mb-2">Order Confirmed!</h1>
      <p className="text-textMuted mb-8 max-w-xs">
        Your fresh fruits and vegetables are being prepared for delivery.
      </p>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm mb-8 text-left">
        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <span className="text-textMuted text-sm">Order ID</span>
          <span className="font-bold">#ORD-5678</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-textMuted text-sm">Estimated Delivery</span>
          <span className="font-bold text-primary">Today, 4:00 PM</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Button onClick={() => navigate('/tracking/ORD-5678')} className="w-full h-12">
          Track Order
        </Button>
        <Button variant="outline" onClick={() => navigate('/home')} className="w-full h-12 bg-white">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
