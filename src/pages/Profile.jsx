import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, MapPin, Settings, Heart, LogOut, ChevronRight,
  ShoppingBag, HelpCircle, Camera, Mail, Phone, Calendar, Edit3, Tag,
  MoreVertical, Home as HomeIcon, Briefcase, PlusCircle, Crown, Eye, Trash2, CheckCircle
} from 'lucide-react';
import { Header } from '../components/Header';
import { MOCK_DATA } from '../data/mockData';
import { useCart } from '../context/CartContext';

export function Profile() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState('orders');

  const menuItems = [
    { id: 'orders', icon: ShoppingBag, label: 'Order History' },
    { id: 'addresses', icon: MapPin, label: 'My Addresses' },
    { id: 'saved', icon: Heart, label: 'Saved Items' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Helper for generating order images based on index
  const getOrderImage = (index) => {
    const images = [
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=200'
    ];
    return images[index % images.length];
  };

  const getBreadcrumbLabel = () => {
    const tab = menuItems.find(item => item.id === activeTab);
    return tab ? tab.label : 'Profile';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-body">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 md:py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-textMuted mb-8">
          <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate('/home')}>Home</span>
          <ChevronRight size={14} />
          <span className="font-semibold text-textMain">{getBreadcrumbLabel()}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col h-full sticky top-8">
              <nav className="flex-1 space-y-1 mb-8">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left ${isActive ? 'bg-green-50 text-primary font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-textMain font-medium'}`}
                    >
                      <Icon size={20} className={isActive ? 'text-primary' : 'text-gray-400'} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-gray-100 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left text-gray-600 hover:bg-gray-50 hover:text-textMain font-medium">
                  <HelpCircle size={20} className="text-gray-400" />
                  <span>Help & Support</span>
                </button>
                <button 
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-left text-red-500 hover:bg-red-50 font-bold mt-2"
                  onClick={() => navigate('/login')}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Main Content */}
          <div className="flex-1">
            


            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xl font-bold text-textMain">Order History</h2>
                  <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-textMain outline-none focus:border-primary">
                      <option>Past 3 months</option>
                      <option>Past 6 months</option>
                      <option>2025</option>
                    </select>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {[...MOCK_DATA.orders, { id: 'ORD-1237', date: '2026-05-05', total: 15.20, status: 'Delivered', items: 2 }, { id: 'ORD-1238', date: '2026-04-12', total: 42.50, status: 'Delivered', items: 8 }].map((order, idx) => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
                        <div className="flex gap-4 items-center">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                            <img src={getOrderImage(idx)} alt="Order" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-textMain mb-1">Order #{order.id}</p>
                            <p className="text-xs text-textMuted mb-2">Placed on {order.date} • {order.items} Items</p>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {order.status === 'Delivered' && <CheckCircle size={12} />}
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                          <p className="text-lg font-bold text-textMain md:mb-3">${order.total.toFixed(2)}</p>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 text-sm font-bold text-primary border border-primary/20 bg-green-50 rounded-lg hover:bg-primary hover:text-white transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xl font-bold text-textMain">My Addresses</h2>
                  <button className="flex items-center gap-1.5 text-sm font-bold text-white bg-primary px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <PlusCircle size={16} /> Add Address
                  </button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="border border-green-200 bg-green-50/30 rounded-xl p-5 relative">
                    <span className="absolute top-5 right-5 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Default</span>
                    <div className="flex items-center gap-2 mb-4 text-textMain">
                      <HomeIcon size={18} className="text-primary" />
                      <h3 className="font-bold text-lg">Home</h3>
                    </div>
                    <p className="text-sm text-textMuted mb-2">Alex Johnson</p>
                    <p className="text-sm text-textMuted leading-relaxed mb-6">
                      123 Fresh Valley Road,<br/>Green City, GC 10020, USA
                    </p>
                    <div className="flex gap-3">
                      <button className="text-sm font-bold text-primary hover:underline">Edit</button>
                      <button className="text-sm font-bold text-red-500 hover:underline">Remove</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-4 text-textMain">
                      <Briefcase size={18} className="text-gray-400" />
                      <h3 className="font-bold text-lg">Work</h3>
                    </div>
                    <p className="text-sm text-textMuted mb-2">Alex Johnson</p>
                    <p className="text-sm text-textMuted leading-relaxed mb-6">
                      456 Organic Street,<br/>Green City, GC 10020, USA
                    </p>
                    <div className="flex gap-3">
                      <button className="text-sm font-bold text-primary hover:underline">Edit</button>
                      <button className="text-sm font-bold text-red-500 hover:underline">Remove</button>
                      <button className="text-sm font-bold text-gray-500 hover:text-textMain ml-auto">Set Default</button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: SAVED ITEMS */}
            {activeTab === 'saved' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-xl font-bold text-textMain">Saved Items</h2>
                  <p className="text-sm text-textMuted mt-1">8 items in your wishlist</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                    {MOCK_DATA.products.slice(0, 8).map(p => (
                      <div key={p.id} className="border border-gray-100 rounded-xl overflow-hidden group">
                        <div className="aspect-square bg-gray-50 relative p-4">
                          <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50">
                            <Heart size={16} className="fill-current" />
                          </button>
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="p-4 flex flex-col">
                          <h4 className="font-bold text-textMain line-clamp-1 mb-1">{p.name}</h4>
                          <p className="text-sm font-bold text-primary mb-3">${p.price} <span className="text-xs text-textMuted font-medium">/{p.unit}</span></p>
                          <button 
                            className="w-full py-2 text-xs font-bold text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                            onClick={(e) => { e.stopPropagation(); addItem(p, 1); }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-xl font-bold text-textMain">Account Settings</h2>
                  <p className="text-sm text-textMuted mt-1">Manage your personal information and preferences.</p>
                </div>
                <div className="p-6 md:p-8 max-w-2xl">
                  <form className="space-y-6">
                    
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-primary relative">
                        A
                        <button type="button" className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-sm hover:text-primary">
                          <Camera size={12} />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-bold text-textMain">Profile Photo</h3>
                        <p className="text-xs text-textMuted mb-2">JPG or PNG, max 2MB</p>
                        <div className="flex gap-2">
                          <button type="button" className="text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">Upload</button>
                          <button type="button" className="text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-md text-red-500 hover:bg-red-50">Remove</button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-textMain">First Name</label>
                        <input type="text" defaultValue="Alex" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-textMain">Last Name</label>
                        <input type="text" defaultValue="Johnson" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-textMain">Email Address</label>
                      <input type="email" defaultValue="alex.johnson@example.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-textMain">Phone Number</label>
                      <input type="tel" defaultValue="+1 234 567 8900" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="font-bold text-textMain mb-4">Email Notifications</h3>
                      <label className="flex items-center gap-3 mb-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="text-sm text-textMuted">Order updates and delivery status</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="text-sm text-textMuted">Promotions, new products, and sales</span>
                      </label>
                    </div>

                    <div className="pt-6 flex justify-end gap-3">
                      <button type="button" className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                      <button type="button" className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-green-700 transition-colors">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
