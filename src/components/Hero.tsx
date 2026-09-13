import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="w-full cursor-pointer overflow-hidden bg-[#2A0845] min-h-[50vh] border-b-[6px] border-[#5C167D]" onClick={onExplore}>
      <div className="w-full mt-0 md:mt-[-12.5%] relative mb-[-20%] md:mb-0">
        <picture className="block w-full">
          <source media="(min-width: 768px)" srcSet={`${import.meta.env.BASE_URL}mockup-desktop-final.jpg`} />
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

        {/* Camouflage Patch to erase the baked-in Desktop button */}
        <div 
          className="hidden md:block absolute bg-[#280e28] z-[5]"
          style={{
            left: '67%',
            transform: 'translateX(-50%)',
            top: '70.5%',
            width: '15.5%',
            height: '6%',
            filter: 'blur(2px)' // Slight blur to blend with the JPG artifacts
          }}
        />

        {/* New Smaller HTML Overlay Button for Desktop */}
        <button 
          className="hidden md:flex absolute bg-[#eab308] text-theme-maroon font-bold text-base rounded-xl shadow-xl hover:bg-[#ca8a04] transition-all z-10 items-center justify-center border-2 border-[#fef08a]"
          style={{
            left: '67%',
            transform: 'translateX(-50%) translateZ(0)',
            WebkitFontSmoothing: 'antialiased',
            top: '70.8%',
            width: '12%',
            height: '4.5%',
            minHeight: '38px'
          }}
        >
          Shop Now <ArrowRight className="w-4 h-4 ml-1.5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
