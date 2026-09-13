import React from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  className,
}) => {
  const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard';

  return (
    <div
      onClick={() => onSelect(product)}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer relative ${className || ''}`}
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-gray-100 rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product, e);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-grow bg-[#FAFAF9]">
        <h3 className="font-serif font-bold text-[#6D1B2F] text-sm sm:text-base border-b border-[#6D1B2F]/20 pb-1 mb-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-500 text-[10px] sm:text-xs line-clamp-2 mb-3 leading-snug">
            {product.description}
          </p>
        )}

        {/* Sizes row (mock layout from screenshot) */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-2 mb-3">
            {product.sizes.slice(0, 2).map((size, idx) => (
              <span 
                key={idx} 
                className={`text-[10px] sm:text-xs font-medium px-2 py-1 rounded border ${idx === 0 ? 'border-[#6D1B2F] bg-[#6D1B2F]/5 text-[#6D1B2F]' : 'border-gray-200 text-gray-500'}`}
              >
                {size.length > 12 ? size.substring(0,10)+'...' : size}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <div className="font-bold text-[#6D1B2F] text-sm sm:text-base mb-3">
            Price: ₹{product.price.toLocaleString('en-IN')}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            className="w-full py-2.5 sm:py-3 bg-[#c9a24b] text-[#2A0845] text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#b89139] transition-colors rounded-lg shadow-sm hover:shadow flex justify-center items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
