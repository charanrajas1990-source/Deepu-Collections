import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="w-full cursor-pointer overflow-hidden bg-[#2A0845] min-h-[50vh]" onClick={onExplore}>
      <picture className="block w-full mt-[-22%] md:mt-[-12.5%]">
        <source media="(min-width: 768px)" srcSet={`${import.meta.env.BASE_URL}mockup-desktop-final.jpg`} />
        <img
          src={`${import.meta.env.BASE_URL}mockup-mobile-final.jpg`}
          alt="Deepu's Collection Home"
          className="w-full h-auto object-cover object-top"
        />
      </picture>
    </div>
  );
};
