import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_DATA } from '../data/mockData';
import { ChevronLeft, RotateCw } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../context/CartContext';

export function OrderHistory() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleReorder = (order) => {
    // In a real app, we would fetch the order items and add them.
    // Here we just add a mock item and navigate to cart
    addItem(MOCK_DATA.products[0], 2);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center shadow-sm">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ChevronLeft size={24} className="text-textMain" />
        </button>
        <h1 className="text-lg font-heading font-semibold text-textMain">Order History</h1>
      </header>

      <div className="p-4 space-y-4 max-w-4xl mx-auto w-full">
        {MOCK_DATA.orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3 border-b pb-3">
              <div>
                <p className="font-bold text-textMain">#{order.id}</p>
                <p className="text-xs text-textMuted mt-1">{order.date}</p>
              </div>
              <Badge variant={order.status === 'Delivered' ? 'success' : 'outline'}>
                {order.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-textMuted">{order.items} Items</p>
                <p className="font-bold text-lg mt-1">${order.total.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => handleReorder(order)}
                className="flex items-center gap-2 text-sm font-semibold text-primary border border-primary px-3 py-2 rounded-lg hover:bg-lightGreen transition-colors"
              >
                <RotateCw size={16} /> Re-order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
