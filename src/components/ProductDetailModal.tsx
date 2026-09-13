import React, { useState } from 'react';
import { X, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative animate-fadeIn max-h-[90vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-gray-100 rounded-full text-gray-700 shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 p-6 bg-gray-50 flex flex-col gap-4 justify-center">
          <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-inner">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {product.gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 shrink-0 ${
                    selectedImage === img ? 'border-[#5C167D]' : 'border-transparent opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5C167D] bg-purple-100 px-3 py-1 rounded-full">
                {product.fabric}
              </span>
              {product.badge && (
                <span className="text-xs font-medium text-[#c9a24b] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  {product.badge}
                </span>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-theme-maroon mb-3">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-bold text-[#5C167D]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Select Size / Drape:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-[#5C167D] text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Quantity:
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-bold"
                >
                  -
                </button>
                <span className="font-semibold text-theme-maroon w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#5C167D] hover:bg-[#4A1066] text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-gray-200 text-gray-600 hover:border-[#5C167D]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-gray-500">
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <Truck className="w-4 h-4 text-[#5C167D]" />
                <span>Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-[#5C167D]" />
                <span>Genuine Silk</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
                <RotateCcw className="w-4 h-4 text-[#5C167D]" />
                <span>7 Days Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
