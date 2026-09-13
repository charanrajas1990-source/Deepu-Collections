import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

interface PromoBannerProps {
  onShopWedding: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onShopWedding }) => {
  return (
    <section className="py-8 md:py-16 px-4 md:px-8 bg-theme-cream">
      <div className="max-w-7xl mx-auto bg-[#5C167D] rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 text-white relative">
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6 w-max border border-rose-500/30">
            <Clock className="w-3.5 h-3.5 animate-spin" /> Ending Soon
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            40% Off Wedding Lehngas & Bridal Collection
          </h2>

          <p className="text-purple-200 text-sm sm:text-base mb-8 leading-relaxed">
            Adorn yourself in magnificent handcrafted zardozi work, pure katan silks, and royal ensembles tailored for your unforgettable moments.
          </p>

          <div>
            <button
              onClick={onShopWedding}
              className="bg-[#c9a24b] hover:bg-[#b89139] text-theme-maroon font-bold px-8 py-4 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Shop Wedding Specials
            </button>
          </div>
        </div>

        <div className="relative min-h-[350px] lg:min-h-[450px]">
          <img
            src="https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=1000&q=85"
            alt="Wedding Lehenga Promo"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#5C167D] via-transparent to-transparent opacity-80 lg:opacity-60" />
        </div>
      </div>
    </section>
  );
};
