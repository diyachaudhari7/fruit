import React from 'react';
import { ShieldCheck, Truck, Clock, Headphones } from 'lucide-react';

export function FeaturesStrip() {
  return (
    <div className="bg-[#F0F7F4] py-4 sm:py-8 border-t border-b border-green-100">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="grid grid-cols-4 gap-1 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 border-r border-green-200 last:border-0 pr-1 sm:pr-4 text-center sm:text-left">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm mx-auto sm:mx-0">
              <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-textMain text-[8px] sm:text-sm leading-tight sm:leading-normal">Fresh Guarantee</h4>
              <p className="text-[6px] sm:text-xs text-textMuted mt-0.5 hidden sm:block">100% fresh products</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 border-r border-green-200 last:border-0 pr-1 sm:pr-4 text-center sm:text-left">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm mx-auto sm:mx-0">
              <Truck className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-textMain text-[8px] sm:text-sm leading-tight sm:leading-normal">Free Delivery</h4>
              <p className="text-[6px] sm:text-xs text-textMuted mt-0.5 hidden sm:block">On orders above $49</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 border-r border-green-200 last:border-0 pr-1 sm:pr-4 text-center sm:text-left">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm mx-auto sm:mx-0">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 rotate-180" /> {/* Simulate 'Easy Returns' icon */}
            </div>
            <div>
              <h4 className="font-bold text-textMain text-[8px] sm:text-sm leading-tight sm:leading-normal">Easy Returns</h4>
              <p className="text-[6px] sm:text-xs text-textMuted mt-0.5 hidden sm:block">No questions asked</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 text-center sm:text-left">
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white text-primary flex items-center justify-center shrink-0 shadow-sm mx-auto sm:mx-0">
              <Headphones className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold text-textMain text-[8px] sm:text-sm leading-tight sm:leading-normal">24/7 Support</h4>
              <p className="text-[6px] sm:text-xs text-textMuted mt-0.5 hidden sm:block">We're here for you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
