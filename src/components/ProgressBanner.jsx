import React from 'react';
import { ShoppingCart, MapPin, CreditCard, CheckCircle, Leaf } from 'lucide-react';

export function ProgressBanner({ activeStep }) {
  const steps = [
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'order_placed', label: 'Order\nPlaced', icon: CheckCircle }
  ];

  const getStepStyle = (stepId) => {
    const activeIndex = steps.findIndex(s => s.id === activeStep);
    const stepIndex = steps.findIndex(s => s.id === stepId);
    
    if (stepIndex <= activeIndex) {
      return "bg-primary text-white shadow-md border-transparent";
    }
    return "bg-white text-gray-400 border border-gray-200";
  };

  const getTextStyle = (stepId) => {
    const activeIndex = steps.findIndex(s => s.id === activeStep);
    const stepIndex = steps.findIndex(s => s.id === stepId);
    
    if (stepIndex <= activeIndex) {
      return "text-primary font-bold";
    }
    return "text-textMuted font-medium";
  };

  return (
    <div className="bg-[#Edf5ee] rounded-2xl p-6 mb-8 flex flex-col items-center justify-center border border-green-50 shadow-sm w-full">
      
      {/* Progress Tracker */}
      <div className="flex items-center justify-center gap-2 md:gap-4 w-full overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2 min-w-[60px]">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStepStyle(step.id)}`}>
                  <Icon size={18} />
                </div>
                <span className={`text-xs text-center leading-tight whitespace-pre-line ${getTextStyle(step.id)}`}>{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 md:w-12 h-px bg-gray-300 -mt-6"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
