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
    <section id="categories-section" className="scroll-mt-24 md:scroll-mt-32 pt-6 pb-2 md:pt-12 md:pb-2 px-4 md:px-8 bg-theme-cream">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section mimicking the reference image */}
        <div className="flex flex-row justify-between items-end mb-5 md:mb-8 border-b border-gray-200 pb-4">
          <div className="relative">
            <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-wide text-[#3B1A4A]">
              Explore Categories
            </h2>
            {/* Small yellow underline */}
            <div className="absolute -bottom-[17px] left-0 w-16 h-1 bg-[#c9a24b]"></div>
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
                className="group cursor-pointer flex flex-col items-center shrink-0 snap-start"
              >
                <div className={`w-[140px] h-[180px] sm:w-[160px] sm:h-[200px] md:w-full md:aspect-[3/4] md:h-auto rounded-2xl overflow-hidden shadow-sm transition-all duration-300 relative mx-auto ${isActive ? 'ring-2 ring-[#c9a24b] ring-offset-2 shadow-md' : 'border border-gray-200 hover:border-[#c9a24b] hover:shadow-md'}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <h3 className={`font-serif font-bold text-sm md:text-sm font-medium tracking-wide mt-4 transition-colors flex items-center gap-1 ${isActive ? 'text-[#5C167D]' : 'text-theme-maroon group-hover:text-[#c9a24b]'}`}>
                  <span className={`${isActive ? 'border-b-2 border-[#c9a24b]' : ''}`}>{cat.name}</span>
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
