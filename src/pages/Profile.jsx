import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, MapPin, Settings, Heart, LogOut, ChevronRight,
  ShoppingBag, HelpCircle, Camera, Mail, Phone, Calendar, Edit3, Tag,
  MoreVertical, Home as HomeIcon, Briefcase, PlusCircle, Crown, Eye, Trash2, CheckCircle, ArrowRight, RotateCw
} from 'lucide-react';
import { Header } from '../components/Header';
import { MOCK_DATA } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useProfile } from '../context/ProfileContext';

export function Profile() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { savedItems, toggleSavedItem } = useWishlist();
  const [activeTab, setActiveTab] = useState('orders');

  // Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Alex Johnson',
      address: '123 Fresh Valley Road,\nGreen City, GC 10020, USA',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Alex Johnson',
      address: '456 Organic Street,\nGreen City, GC 10020, USA',
      isDefault: false
    }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleAddClick = () => {
    setCurrentAddress({ id: Date.now(), type: 'Home', name: '', address: '', isDefault: false });
    setIsEditing(true);
  };
  const handleEditClick = (addr) => {
    setCurrentAddress(addr);
    setIsEditing(true);
  };
  const handleRemove = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };
  const handleSetDefault = (id) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (addresses.find(a => a.id === currentAddress.id)) {
      setAddresses(addresses.map(a => a.id === currentAddress.id ? currentAddress : a));
    } else {
      setAddresses([...addresses, currentAddress]);
    }
    setIsEditing(false);
  };

  const { accountSettings, setAccountSettings, profileImage, setProfileImage } = useProfile();
  const [draftSettings, setDraftSettings] = useState(accountSettings);
  const [isSavedSettings, setIsSavedSettings] = useState(false);

  const [orderFilter, setOrderFilter] = useState('Past 3 months');

  const allOrders = [
    ...MOCK_DATA.orders,
    { id: 'ORD-1237', date: '2026-05-05', total: 15.20, status: 'Delivered', items: 2, products: [MOCK_DATA.products[1]] },
    { id: 'ORD-1238', date: '2026-04-12', total: 42.50, status: 'Delivered', items: 8, products: [MOCK_DATA.products[2]] },
    { id: 'ORD-1239', date: '2025-11-20', total: 112.00, status: 'Delivered', items: 14, products: [MOCK_DATA.products[3]] }
  ];

  const filteredOrders = allOrders.filter(order => {
    const orderDate = new Date(order.date);
    const now = new Date('2026-08-21');
    const diffMonths = (now.getFullYear() - orderDate.getFullYear()) * 12 + (now.getMonth() - orderDate.getMonth());

    if (orderFilter === 'Past 3 months') {
      return diffMonths <= 3;
    } else if (orderFilter === 'Past 6 months') {
      return diffMonths <= 6;
    } else if (orderFilter === '2025') {
      return orderDate.getFullYear() === 2025;
    }
    return true;
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setAccountSettings(draftSettings);
    setIsSavedSettings(true);
    setTimeout(() => setIsSavedSettings(false), 3000);
  };

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handlePhotoRemove = () => {
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
                    <select 
                      value={orderFilter}
                      onChange={e => setOrderFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-textMain outline-none focus:border-primary"
                    >
                      <option value="Past 3 months">Past 3 months</option>
                      <option value="Past 6 months">Past 6 months</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {filteredOrders.length > 0 ? filteredOrders.map((order, idx) => {
                      const productImage = order.products && order.products.length > 0 
                        ? order.products[0].image 
                        : MOCK_DATA.products[0].image;
                      
                      return (
                        <div key={order.id} className="border border-gray-100 rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/30 transition-colors">
                          <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                              <img src={productImage} alt="Order" className="w-full h-full object-cover" />
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
                              <button 
                                onClick={() => navigate(`/order/${order.id}`)}
                                className="px-4 py-2 text-sm font-bold text-primary border border-primary/20 bg-green-50 rounded-lg hover:bg-primary hover:text-white transition-colors"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="text-center py-8 text-textMuted">No orders found for this time period.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-xl font-bold text-textMain">My Addresses</h2>
                  {!isEditing && (
                    <button onClick={handleAddClick} className="flex items-center gap-1.5 text-sm font-bold text-white bg-primary px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      <PlusCircle size={16} /> Add Address
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form className="p-6 space-y-4" onSubmit={handleSave}>
                    <h3 className="font-bold text-lg mb-4">{addresses.find(a => a.id === currentAddress.id) ? 'Edit Address' : 'Add New Address'}</h3>
                    <div>
                      <label className="text-sm font-bold text-textMain">Type</label>
                      <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 mt-1 focus:outline-none focus:border-primary" value={currentAddress.type} onChange={e => setCurrentAddress({ ...currentAddress, type: e.target.value })}>
                        <option>Home</option>
                        <option>Work</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-textMain">Name</label>
                      <input required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 mt-1 focus:outline-none focus:border-primary" value={currentAddress.name} onChange={e => setCurrentAddress({ ...currentAddress, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-textMain">Address</label>
                      <textarea required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 mt-1 h-24 focus:outline-none focus:border-primary" value={currentAddress.address} onChange={e => setCurrentAddress({ ...currentAddress, address: e.target.value })} />
                    </div>
                    <div className="flex gap-3 justify-end mt-6">
                      <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl border font-bold hover:bg-gray-50">Cancel</button>
                      <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-green-700">Save</button>
                    </div>
                  </form>
                ) : (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(addr => (
                      <div key={addr.id} className={`border rounded-xl p-5 relative ${addr.isDefault ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}>
                        {addr.isDefault && (
                          <span className="absolute top-5 right-5 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Default</span>
                        )}
                        <div className="flex items-center gap-2 mb-4 text-textMain">
                          {addr.type === 'Home' ? <HomeIcon size={18} className={addr.isDefault ? 'text-primary' : 'text-gray-400'} /> : <Briefcase size={18} className={addr.isDefault ? 'text-primary' : 'text-gray-400'} />}
                          <h3 className="font-bold text-lg">{addr.type}</h3>
                        </div>
                        <p className="text-sm text-textMuted mb-2">{addr.name}</p>
                        <p className="text-sm text-textMuted leading-relaxed mb-6 whitespace-pre-line">
                          {addr.address}
                        </p>
                        <div className="flex gap-3">
                          <button onClick={() => handleEditClick(addr)} className="text-sm font-bold text-primary hover:underline">Edit</button>
                          <button onClick={() => handleRemove(addr.id)} className="text-sm font-bold text-red-500 hover:underline">Remove</button>
                          {!addr.isDefault && (
                            <button onClick={() => handleSetDefault(addr.id)} className="text-sm font-bold text-gray-500 hover:text-textMain ml-auto">Set Default</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: SAVED ITEMS */}
            {activeTab === 'saved' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-xl font-bold text-textMain">Saved Items</h2>
                  <p className="text-sm text-textMuted mt-1">{savedItems.length} items in your wishlist</p>
                </div>
                <div className="p-6">
                  {savedItems.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart size={48} className="mx-auto text-gray-200 mb-4" />
                      <h3 className="text-lg font-bold text-textMain mb-2">Your wishlist is empty</h3>
                      <p className="text-textMuted">Explore our categories and add items you love!</p>
                      <button onClick={() => navigate('/categories')} className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-green-700">Browse Products</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                      {savedItems.map(p => (
                        <div key={p.id} className="border border-gray-100 rounded-xl overflow-hidden group cursor-pointer" onClick={() => navigate(`/product/${p.id}`)}>
                          <div className="aspect-square bg-gray-50 relative p-4">
                            <button
                              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm z-10 hover:bg-red-50"
                              onClick={(e) => { e.stopPropagation(); toggleSavedItem(p); }}
                            >
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
                  )}
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
                  <form className="space-y-6" onSubmit={handleSaveSettings}>

                    <div className="flex items-center gap-6 mb-8">
                      <div className="relative w-20 h-20">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-primary overflow-hidden">
                          {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            draftSettings.firstName ? draftSettings.firstName.charAt(0).toUpperCase() : 'U'
                          )}
                        </div>
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shadow-sm hover:text-primary z-10">
                          <Camera size={12} />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-bold text-textMain mb-2">Profile Photo</h3>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50">Upload</button>
                          <button type="button" onClick={handlePhotoRemove} className="text-xs font-bold px-3 py-1.5 border border-gray-200 rounded-md text-red-500 hover:bg-red-50">Remove</button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-textMain">First Name</label>
                        <input type="text" value={draftSettings.firstName} onChange={e => setDraftSettings({ ...draftSettings, firstName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-textMain">Last Name</label>
                        <input type="text" value={draftSettings.lastName} onChange={e => setDraftSettings({ ...draftSettings, lastName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-textMain">Email Address</label>
                      <input type="email" value={draftSettings.email} onChange={e => setDraftSettings({ ...draftSettings, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-textMain">Phone Number</label>
                      <input type="tel" value={draftSettings.phone} onChange={e => setDraftSettings({ ...draftSettings, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary" />
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="font-bold text-textMain mb-4">Email Notifications</h3>
                      <label className="flex items-center gap-3 mb-3 cursor-pointer">
                        <input type="checkbox" checked={draftSettings.orderUpdates} onChange={e => setDraftSettings({ ...draftSettings, orderUpdates: e.target.checked })} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="text-sm text-textMuted">Order updates and delivery status</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={draftSettings.promotions} onChange={e => setDraftSettings({ ...draftSettings, promotions: e.target.checked })} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
                        <span className="text-sm text-textMuted">Promotions, new products, and sales</span>
                      </label>
                    </div>

                    <div className="pt-6 flex justify-end gap-3">
                      <button type="button" onClick={() => setDraftSettings(accountSettings)} className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                      <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-green-700 transition-colors flex items-center gap-2">
                        {isSavedSettings && <CheckCircle size={16} />}
                        {isSavedSettings ? 'Saved!' : 'Save Changes'}
                      </button>
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
