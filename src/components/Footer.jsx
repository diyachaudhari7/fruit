import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Freshly</h2>
            <p className="text-textMuted text-sm leading-relaxed mb-6">
              Delivering the freshest organic fruits and vegetables directly from local farms to your doorstep. Eat healthy, live better.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Globe size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><MessageCircle size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Camera size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-textMain mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-textMuted">
              <li><Link to="/home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/history" className="hover:text-primary transition-colors">Order History</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">My Cart</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Profile</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-primary transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-heading font-semibold text-textMain mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-textMuted">
              {MOCK_DATA.categories.slice(0, 4).map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="hover:text-primary transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-textMain mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-textMuted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>123 Fresh Valley Road, Green City, GC 10020</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@freshly.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-textMuted">
          <p>&copy; 2026 Freshly Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
