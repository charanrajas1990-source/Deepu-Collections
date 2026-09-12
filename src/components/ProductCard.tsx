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
  return (
    <div
      onClick={() => onSelect(product)}
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-purple-100 flex flex-col cursor-pointer relative ${className || ''}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <span className="hidden md:inline-block absolute top-3 left-3 bg-[#5C167D] text-white text-xs px-2.5 py-1 rounded-full font-medium tracking-wide shadow">
            {product.badge}
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => onToggleWishlist(product, e)}
            className={`p-2 rounded-full shadow-md transition-colors ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-[#5C167D] hover:bg-[#5C167D] hover:text-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="p-2 rounded-full bg-white/90 text-[#5C167D] hover:bg-[#5C167D] hover:text-white shadow-md transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <span className="text-white text-xs font-medium flex items-center gap-1.5 bg-[#5C167D]/90 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          <span className="text-xs text-purple-700 font-semibold uppercase tracking-wider">
            {product.fabric}
          </span>
          <h3 className="font-serif font-medium text-[#2A0845] text-base mt-1 line-clamp-1 group-hover:text-[#5C167D] transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-3 flex items-baseline gap-2 pt-2 border-t border-purple-50">
          <span className="text-lg font-bold text-[#5C167D]">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
