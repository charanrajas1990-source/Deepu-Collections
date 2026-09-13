import React from 'react';

export const HowToOrderDemo: React.FC = () => {
  const steps = [
    { title: 'Step 1: Browse & Select', desc: 'Choose your favorite sarees from our exquisite collections and add them to cart.' },
    { title: 'Step 2: Secure Payment', desc: 'Pay securely via UPI, Net Banking, or Credit/Debit Card.' },
    { title: 'Step 3: Fast Processing', desc: 'Your order is carefully packed with premium materials to ensure safety.' },
    { title: 'Step 4: Doorstep Delivery', desc: 'Track your shipment live until it reaches your doorstep.' },
  ];

  return (
    <section id="how-to-order-section" className="scroll-mt-24 md:scroll-mt-32 py-10 px-4 md:px-8 bg-theme-cream">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-[#3B1A4A]">How to Order</h2>
          <div className="w-16 h-1 bg-[#c9a24b] mt-2"></div>
        </div>
        
        <div className="relative border-l border-[#e8d5c4] ml-3 md:ml-4 flex flex-col gap-6 md:gap-8 pt-2 pb-2">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-8">
              {/* Timeline dot matching reference */}
              <div className="absolute -left-[11px] top-1 w-[21px] h-[21px] rounded-full border-2 border-[#3B1A4A] bg-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#e8be1e]"></div>
              </div>
              <h3 className="font-bold text-[#3B1A4A] text-base md:text-lg mb-1">{step.title}</h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
