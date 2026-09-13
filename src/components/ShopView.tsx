import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, Search } from 'lucide-react';

interface ShopViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
  initialCategory?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  initialCategory = 'All',
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  
  // Keep the prop synced if it changes from outside
  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filtered = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="shop-products-grid" className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Simple Header indicating current filter */}
      <div className="mb-8 flex justify-between items-end border-b border-gray-200 pb-2">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#5C167D]">
          {selectedCategory === 'All' ? 'All Sarees' : `${selectedCategory} Collection`}
        </h2>
        <span className="text-[#c9a24b] text-[10px] md:text-xs font-bold tracking-widest uppercase">
          {filtered.length} Items
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-purple-100">
          <Search className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <h3 className="font-serif text-xl font-bold text-theme-maroon">No sarees found</h3>
          <p className="text-gray-500 text-xs mt-1">Try searching with another keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-1 sm:px-0">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              className="animate-fadeIn"
            />
          ))}
        </div>
      )}
    </div>
  );
};
