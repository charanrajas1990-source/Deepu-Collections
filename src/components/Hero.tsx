import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="w-full cursor-pointer overflow-hidden bg-[#2A0845] min-h-[50vh] border-b-[6px] border-[#5C167D]" onClick={onExplore}>
      <div className="w-full mt-0 relative mb-[-20%] md:mb-0">
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={`${import.meta.env.BASE_URL}5_womens.webp`} />
          <img
            src={`${import.meta.env.BASE_URL}3_womens.webp`}
            alt="Deepu's Collection Home"
            className="w-full h-auto object-cover object-top"
          />
        </picture>
        
        {/* Simple Shop Now Button for Mobile */}
        <button 
          className="md:hidden absolute bottom-[22%] left-0 right-0 mx-auto w-max bg-[#eab308] text-theme-maroon font-bold text-sm sm:text-base px-8 py-3 rounded-lg shadow-xl hover:bg-[#ca8a04] transition-all z-10 flex items-center justify-center border-2 border-[#fef08a]"
          style={{ WebkitFontSmoothing: 'antialiased' }}
        >
          Shop Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5" strokeWidth={2.5} />
        </button>

        {/* New Smaller HTML Overlay Button for Desktop */}
        <button 
          className="hidden md:flex absolute bottom-[10%] left-0 right-0 mx-auto w-max bg-[#eab308] text-theme-maroon font-bold text-base px-10 py-3 rounded-xl shadow-xl hover:bg-[#ca8a04] transition-all z-10 items-center justify-center border-2 border-[#fef08a]"
          style={{ WebkitFontSmoothing: 'antialiased' }}
        >
          Shop Now <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
