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
      className={`group bg-white rounded-xl overflow-hidden mb-3 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer relative ${className || ''}`}
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
        <h3 className="font-serif font-semibold text-[#6D1B2F] text-sm sm:text-base mb-2">
          <span className="underline decoration-[#6D1B2F]/40 decoration-1 underline-offset-[5px]">{product.name}</span>
        </h3>
        
        {product.description && (
          <p className="text-gray-500 text-[10px] sm:text-xs line-clamp-2 mb-3 leading-snug">
            {product.description}
          </p>
        )}



        <div className="mt-auto">
          <div className="font-semibold text-[#6D1B2F] text-sm sm:text-base mb-3">
            Price: ₹{product.price.toLocaleString('en-IN')}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, e);
            }}
            className="w-full py-2.5 sm:py-3 bg-[#2A0845] text-white text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-[#1a052b] transition-colors rounded-lg shadow-sm hover:shadow flex justify-center items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
