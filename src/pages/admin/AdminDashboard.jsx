import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from 'lucide-react';

function AdminLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-heading font-bold text-primary">Freshly Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => navigate('/admin/dashboard')} className="w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg bg-lightGreen text-primary">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button onClick={() => navigate('/admin/products')} className="w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-textMuted hover:bg-gray-50 hover:text-textMain">
            <Package size={20} /> Products
          </button>
          <button onClick={() => navigate('/admin/orders')} className="w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-textMuted hover:bg-gray-50 hover:text-textMain">
            <ShoppingCart size={20} /> Orders
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-textMuted hover:bg-gray-50 hover:text-textMain">
            <Users size={20} /> Customers
          </button>
        </nav>
        <div className="p-4 border-t">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 p-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

function AdminDashboard() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-heading font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-textMuted mb-2">Total Sales</p>
          <h3 className="text-3xl font-bold text-primary">$12,450</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-textMuted mb-2">Active Orders</p>
          <h3 className="text-3xl font-bold">42</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-textMuted mb-2">Customers</p>
          <h3 className="text-3xl font-bold">1,204</h3>
        </div>
      </div>
    </AdminLayout>
  );
}

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      {/* Other routes can be added here like products, orders */}
    </Routes>
  );
}
