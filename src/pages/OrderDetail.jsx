import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Package, Truck, ReceiptText, MapPin, ExternalLink } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';
import { Header } from '../components/Header';
import { FeaturesStrip } from '../components/FeaturesStrip';

export function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the order in mock data or the extra ones added in Profile.jsx
  const allOrders = [
    ...MOCK_DATA.orders, 
    { id: 'ORD-1237', date: '2026-05-05', total: 15.20, status: 'Delivered', items: 2 }, 
    { id: 'ORD-1238', date: '2026-04-12', total: 42.50, status: 'Delivered', items: 8 },
    { id: 'ORD-1239', date: '2025-11-20', total: 112.00, status: 'Delivered', items: 14 }
  ];
  
  const order = allOrders.find(o => o.id === id) || {
    id: id || 'ORD-UNKNOWN',
    date: '2026-08-21',
    total: 0.00,
    status: 'Unknown',
    items: 0
  };

  // Use actual products from the order if available, otherwise fallback
  const orderItems = order.products && order.products.length > 0 
    ? order.products 
    : [MOCK_DATA.products[0]]; // fallback to first mock product if missing

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 49 ? 0 : 5.99;
  // Use order.total for the final if it exists, otherwise calculate
  const finalTotal = order.total > 0 ? order.total : (subtotal + tax + shipping);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/profile')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-600 hover:text-primary hover:border-primary transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-heading font-bold text-textMain">Order #{order.id}</h1>
              <p className="text-sm text-textMuted">Placed on {order.date}</p>
            </div>
          </div>
          <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {order.status === 'Delivered' && <CheckCircle size={16} />}
            {order.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Order Details */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Items List */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <h2 className="text-lg font-bold text-textMain flex items-center gap-2">
                  <Package size={20} className="text-primary" /> Items in your order
                </h2>
                <span className="text-sm font-bold text-textMuted">{order.items} Items</span>
              </div>
              
              <div className="space-y-4">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 py-2">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-textMain text-sm">{item.name}</h4>
                      <p className="text-xs text-textMuted mt-1">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <p className="font-bold text-textMain">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Link */}
            {order.status !== 'Delivered' && (
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex items-center justify-between cursor-pointer hover:bg-green-100/50 transition-colors" onClick={() => navigate(`/tracking/${order.id}`)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">Track Your Order</h3>
                    <p className="text-sm text-green-700/80">See live updates on your delivery</p>
                  </div>
                </div>
                <ExternalLink size={20} className="text-primary" />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-textMain flex items-center gap-2 mb-6">
                <ReceiptText size={20} className="text-primary" /> Summary
              </h2>
              <div className="space-y-3 text-sm border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-textMuted">Subtotal</span>
                  <span className="font-semibold text-textMain">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted">Shipping</span>
                  <span className="font-semibold text-textMain">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted">Tax</span>
                  <span className="font-semibold text-textMain">${tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-bold text-textMain">Total</span>
                <span className="text-2xl font-bold text-primary">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-textMain flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-primary" /> Delivery Info
              </h2>
              <div className="text-sm space-y-1 text-textMuted">
                <p className="font-bold text-textMain">Home</p>
                <p>123 Applewood Lane</p>
                <p>Suite 4B</p>
                <p>Springfield, IL 62704</p>
              </div>
            </div>

          </div>

        </div>

      </main>

      <FeaturesStrip />
    </div>
  );
}
