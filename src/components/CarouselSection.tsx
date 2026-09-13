import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CarouselSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  bgColor?: string;
  isDarkTheme?: boolean;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({
  title,
  subtitle,
  products,
  bgColor = 'bg-theme-cream',
  isDarkTheme = false,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(Math.max(0, products.length - itemsPerPage), prev + 1));
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className={`py-16 px-4 md:px-8 ${bgColor} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            {subtitle && (
              <span className={`text-sm font-medium tracking-widest uppercase ${isDarkTheme ? 'text-[#c9a24b]' : 'text-[#5C167D]'}`}>
                {subtitle}
              </span>
            )}
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mt-1 ${isDarkTheme ? 'text-white' : 'text-theme-maroon'}`}>
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className={`p-3 rounded-full border transition-all ${
                startIndex === 0
                  ? 'opacity-40 cursor-not-allowed border-gray-300 text-gray-400'
                  : isDarkTheme
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-[#5C167D] text-[#5C167D] hover:bg-[#5C167D] hover:text-white'
              }`}
              title="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex >= products.length - itemsPerPage}
              className={`p-3 rounded-full border transition-all ${
                startIndex >= products.length - itemsPerPage
                  ? 'opacity-40 cursor-not-allowed border-gray-300 text-gray-400'
                  : isDarkTheme
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-[#5C167D] text-[#5C167D] hover:bg-[#5C167D] hover:text-white'
              }`}
              title="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
