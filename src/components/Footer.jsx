import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, MessageCircle, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

export function Footer() {
  const location = useLocation();
  const hiddenOnMobilePaths = ['/cart', '/checkout', '/payment', '/order-success', '/profile'];
  const isHiddenOnMobile = 
    hiddenOnMobilePaths.includes(location.pathname) ||
    location.pathname.startsWith('/tracking') ||
    location.pathname.startsWith('/order');

  return (
    <footer className={`bg-gray-50 border-t border-gray-200 mt-0 md:mt-auto pb-16 sm:pb-0 ${isHiddenOnMobile ? 'hidden md:block' : ''}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-8">
          
          {/* Brand & Description */}
          <div className="col-span-3 md:col-span-1 border-b border-gray-200 pb-4 mb-2 sm:border-0 sm:pb-0 sm:mb-0">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-primary mb-2 sm:mb-4 text-center md:text-left">Freshly</h2>
            <p className="text-textMuted text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 text-center md:text-left">
              Delivering the freshest organic fruits and vegetables directly from local farms to your doorstep. Eat healthy, live better.
            </p>
            <div className="flex justify-center md:justify-start gap-3 sm:gap-4">
              <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Globe size={14} className="sm:w-4 sm:h-4" /></a>
              <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><MessageCircle size={14} className="sm:w-4 sm:h-4" /></a>
              <a href="#" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Camera size={14} className="sm:w-4 sm:h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-textMain text-[10px] sm:text-base mb-2 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-[8px] sm:text-sm text-textMuted">
              <li><Link to="/home" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/history" className="hover:text-primary transition-colors">History</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">My Cart</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Profile</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-primary transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-textMain text-[10px] sm:text-base mb-2 sm:mb-4">Categories</h3>
            <ul className="space-y-1 sm:space-y-2 text-[8px] sm:text-sm text-textMuted">
              {MOCK_DATA.categories.slice(0, 4).map(cat => (
                <li key={cat.id}>
                  <Link to={`/category/${cat.id}`} className="hover:text-primary transition-colors line-clamp-1">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-heading font-semibold text-textMain text-[10px] sm:text-base mb-2 sm:mb-4">Contact Us</h3>
            <ul className="space-y-1 sm:space-y-3 text-[8px] sm:text-sm text-textMuted">
              <li className="flex items-start gap-1 sm:gap-3">
                <MapPin size={10} className="text-primary shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
                <span className="line-clamp-2">123 Fresh Valley, Green City</span>
              </li>
              <li className="flex items-center gap-1 sm:gap-3">
                <Phone size={10} className="text-primary shrink-0 sm:w-[18px] sm:h-[18px]" />
                <span className="line-clamp-1">+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-1 sm:gap-3 break-all">
                <Mail size={10} className="text-primary shrink-0 sm:w-[18px] sm:h-[18px]" />
                <span className="line-clamp-1">support@freshly</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-textMuted text-center md:text-left gap-2 md:gap-0">
          <p>&copy; 2026 Freshly Inc. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
