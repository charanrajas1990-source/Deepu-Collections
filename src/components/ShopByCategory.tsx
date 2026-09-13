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
    <section id="categories-section" className="scroll-mt-24 md:scroll-mt-32 py-12 md:py-20 px-4 md:px-8 bg-[#fcfbf9]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section mimicking the reference image */}
        <div className="flex flex-row justify-between items-end mb-8 md:mb-12 border-b border-gray-200 pb-4">
          <div className="relative">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#5C167D]">
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
        <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 pb-8 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {displayCategories.map((cat, idx) => {
            const isActive = activeCat === cat.name;
            return (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat.name)}
                className="group cursor-pointer flex flex-col items-center shrink-0 snap-start"
              >
                <div className={`w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] md:w-full md:aspect-square md:h-auto rounded-full overflow-hidden shadow-sm transition-all duration-300 relative mx-auto ${isActive ? 'ring-4 ring-[#c9a24b] shadow-md' : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-[#c9a24b]/50'}`}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <h3 className={`font-serif font-bold text-sm md:text-base mt-4 transition-colors flex items-center gap-1 ${isActive ? 'text-[#5C167D]' : 'text-[#2A0845] group-hover:text-[#c9a24b]'}`}>
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
