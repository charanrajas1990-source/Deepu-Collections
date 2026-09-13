import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
        <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-theme-cream">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h2 className="font-serif font-bold text-xl text-theme-maroon">My Wishlist</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Heart className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="font-medium text-base">Your wishlist is empty</p>
              <p className="text-xs text-gray-400 mt-1">Tap the heart icon on any saree to save it here.</p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-purple-50 relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-20 h-24 object-cover rounded-xl shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                />
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h4
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="font-serif font-medium text-theme-maroon text-sm line-clamp-1 cursor-pointer hover:text-[#5C167D]"
                    >
                      {product.name}
                    </h4>
                    <span className="text-xs text-gray-500">{product.fabric}</span>
                    <p className="font-bold text-[#5C167D] text-sm mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={(e) => {
                        onAddToCart(product, e);
                        onRemoveFromWishlist(product);
                      }}
                      className="bg-[#5C167D] hover:bg-[#4A1066] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(product)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
