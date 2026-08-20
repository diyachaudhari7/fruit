import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Check, Truck, Package, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const steps = [
    { title: 'Order Placed', time: '10:00 AM', status: 'completed', icon: Package },
    { title: 'Confirmed', time: '10:15 AM', status: 'completed', icon: Check },
    { title: 'Out for Delivery', time: '11:30 AM', status: 'active', icon: Truck },
    { title: 'Delivered', time: 'Pending', status: 'pending', icon: Home },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft size={24} className="text-textMain" />
        </button>
        <h1 className="text-lg font-heading font-semibold text-textMain">Track Order</h1>
      </header>

      <div className="p-4 bg-white shadow-sm mb-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto w-full">
          <div>
            <p className="text-sm text-textMuted">Order ID</p>
            <p className="font-bold">#{id || 'ORD-5678'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-textMuted">Estimated Time</p>
            <p className="font-bold text-primary">35 Mins</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 bg-white mx-4 rounded-xl shadow-sm border border-gray-100 max-w-4xl md:mx-auto w-[calc(100%-2rem)] md:w-full mt-4 mb-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-100"></div>
          <div className="absolute left-6 top-6 h-1/2 w-0.5 bg-primary"></div>

          <div className="space-y-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    step.status === 'completed' ? 'bg-primary text-white' : 
                    step.status === 'active' ? 'bg-white border-2 border-primary text-primary shadow-[0_0_0_4px_rgba(46,125,50,0.2)]' : 
                    'bg-gray-100 text-gray-400'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="pt-2">
                    <h4 className={`font-semibold ${step.status === 'pending' ? 'text-textMuted' : 'text-textMain'}`}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-textMuted mt-1">{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <Button onClick={() => navigate('/home')} className="w-full h-12">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
