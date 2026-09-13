import React from 'react';
import { ShoppingCart, CreditCard, Truck, Package } from 'lucide-react';

export const HowToOrderDemo: React.FC = () => {
  const steps = [
    { icon: <ShoppingCart className="w-8 h-8" />, title: '1. Browse & Select', desc: 'Choose your favorite sarees from our exquisite collections and add them to cart.' },
    { icon: <CreditCard className="w-8 h-8" />, title: '2. Secure Payment', desc: 'Pay securely via UPI, Net Banking, or Credit/Debit Card.' },
    { icon: <Package className="w-8 h-8" />, title: '3. Fast Processing', desc: 'Your order is carefully packed with premium materials to ensure safety.' },
    { icon: <Truck className="w-8 h-8" />, title: '4. Doorstep Delivery', desc: 'Track your shipment live until it reaches your doorstep.' },
  ];

  return (
    <section id="how-to-order-section" className="scroll-mt-24 md:scroll-mt-32 py-16 px-4 md:px-8 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#5C167D]">How to Order</h2>
          <p className="text-gray-500 mt-2 font-medium tracking-wide">4 Simple Steps to Get Your Beautiful Saree</p>
          <div className="w-16 h-1 bg-[#c9a24b] mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-theme-cream rounded-2xl shadow-sm border border-gray-100 hover:border-[#c9a24b] transition-colors">
              <div className="w-16 h-16 rounded-full bg-[#f2ebd9] flex items-center justify-center text-[#5C167D] mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-theme-maroon mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
