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
        
        <div className="relative mt-8 md:mt-16">
          {/* Connecting Lines */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#e8d5c4] md:hidden z-0"></div>
          {/* Desktop horizontal line: spans between dots */}
          <div className="hidden md:block absolute top-[10px] left-[12.5%] right-[12.5%] h-[2px] bg-[#d5c3b3] z-0"></div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-start md:items-center text-left md:text-center flex-1 pl-10 md:pl-0 md:px-4">
                {/* Timeline dot */}
                <div className="absolute left-0 md:relative md:left-auto top-0 w-[21px] h-[21px] rounded-full border-2 border-[#3B1A4A] bg-theme-cream flex items-center justify-center shrink-0 mb-0 md:mb-4 z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e8be1e]"></div>
                </div>
                <h3 className="font-bold text-[#3B1A4A] text-base md:text-[15px] lg:text-base mb-1 md:mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
