import React from 'react';
import { ShieldCheck, Sparkles, Truck, PackageCheck } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  const trusts = [
    { icon: <Sparkles className="w-6 h-6 md:w-8 md:h-8" />, title: 'Premium Quality', desc: 'Handpicked authentic fabrics' },
    { icon: <PackageCheck className="w-6 h-6 md:w-8 md:h-8" />, title: 'Secure Packaging', desc: 'Double-sealed for safety' },
    { icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />, title: '100% Genuine', desc: 'Direct from master weavers' },
    { icon: <Truck className="w-6 h-6 md:w-8 md:h-8" />, title: 'Pan India Shipping', desc: 'Reliable doorstep delivery' },
  ];

  return (
    <section className="py-6 md:py-8 bg-[#f4ebd9] border-y border-[#c9a24b]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trusts.map((t, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#5C167D] text-[#c9a24b] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                {t.icon}
              </div>
              <h4 className="font-bold text-theme-maroon text-sm md:text-base mb-1">{t.title}</h4>
              <p className="text-xs md:text-sm text-gray-600 px-2">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
