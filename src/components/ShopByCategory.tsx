import React, { useState } from 'react';
import { CATEGORIES } from '../data';

interface ShopByCategoryProps {
  onSelectCategory: (categoryName: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({ onSelectCategory }) => {
  const [activeCat, setActiveCat] = useState<string>('All');

  // Prepend 'All' category if it doesn't exist, using a generic image
  const displayCategories = [
    { name: 'All', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80', count: 'Explore' },
    ...CATEGORIES.filter(c => c.name !== 'All')
  ];

  const handleCategoryClick = (name: string) => {
    setActiveCat(name);
    // Add a tiny delay so the user sees the active state before navigating
    setTimeout(() => {
      onSelectCategory(name);
    }, 300);
  };

  return (
    <section id="categories-section" className="scroll-mt-24 md:scroll-mt-32 pt-6 pb-2 md:pt-8 md:pb-2 px-4 md:px-8 bg-theme-cream">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section mimicking the reference image */}
        <div className="flex flex-row justify-between items-end mb-6 md:mb-8 pb-2">
          <div>
            <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-wide text-[#8C1D35]">
              Explore Categories
            </h2>
            {/* Small maroon underline */}
            <div className="w-[100px] h-[3px] bg-[#8C1D35] mt-2"></div>
          </div>
          <span className="text-[#c9a24b] text-[10px] md:text-sm font-bold tracking-widest uppercase mb-1">
            Our Specialities
          </span>
        </div>

        {/* Horizontal Scroll on Mobile, Grid on Laptop */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 pb-2 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {displayCategories.map((cat, idx) => {
            const isActive = activeCat === cat.name;
            return (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="cursor-pointer flex flex-col items-center shrink-0 snap-start w-[160px] md:w-auto"
              >
                <div className={`w-full aspect-square rounded-xl overflow-hidden shadow-sm transition-all duration-300 relative mx-auto ${isActive ? 'border-[3px] border-[#c9a24b] shadow-md' : ''}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className={`mt-3 flex items-center justify-center transition-colors ${isActive ? 'text-[#8C1D35] border-b-2 border-[#8C1D35] pb-0.5' : 'text-[#3B1A4A]'}`}>
                  <h3 className="font-sans font-bold text-[13px] md:text-[15px] tracking-wide">
                    {cat.name}
                  </h3>
                  <span className="font-bold text-base leading-none ml-1">→</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
