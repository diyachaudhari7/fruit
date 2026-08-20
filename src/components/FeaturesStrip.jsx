import React from 'react';
import { ShieldCheck, Truck, Clock, Headphones } from 'lucide-react';

export function FeaturesStrip() {
  return (
    <div className="bg-[#F0F7F4] py-8 border-t border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 border-r border-green-200 last:border-0 md:pr-4">
            <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-textMain text-sm">Fresh Guarantee</h4>
              <p className="text-xs text-textMuted mt-0.5">100% fresh products</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r border-green-200 last:border-0 md:pr-4">
            <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-textMain text-sm">Free Delivery</h4>
              <p className="text-xs text-textMuted mt-0.5">On orders above $49</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-r border-green-200 last:border-0 md:pr-4">
            <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm">
              <Clock size={24} className="rotate-180" /> {/* Simulate 'Easy Returns' icon */}
            </div>
            <div>
              <h4 className="font-bold text-textMain text-sm">Easy Returns</h4>
              <p className="text-xs text-textMuted mt-0.5">No questions asked</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-bold text-textMain text-sm">24/7 Support</h4>
              <p className="text-xs text-textMuted mt-0.5">We're here for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
