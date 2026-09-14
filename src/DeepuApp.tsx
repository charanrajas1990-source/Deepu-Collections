"use client";
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
// import { INITIAL_PRODUCTS } from './data';
import { Product, CartItem, Order } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { FounderSection } from './components/FounderSection';
import { TestimonialSlider } from './components/TestimonialSlider';
import { TrustBanner } from './components/TrustBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShopByCategory } from './components/ShopByCategory';
import { CarouselSection } from './components/CarouselSection';
import { PromoBanner } from './components/PromoBanner';
import { LatestCollections } from './components/LatestCollections';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { AccountModal } from './components/AccountModal';
import { AdminView } from './components/AdminView';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { HowToOrderDemo } from './components/HowToOrderDemo';
import { FaqDemo } from './components/FaqDemo';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => doc.data() as Product);
      // Sort or handle data if needed, but for now just set it
      setProducts(productsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['1', '5']);
  

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [shopCategoryFilter, setShopCategoryFilter] = useState('All');

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, selectedSize: product.sizes[0] || 'Standard', quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleAddToCartWithSize = (product: Product, size: string, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
  };

  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleOrderSuccess = async (newOrder: Order) => {
    try {
      await setDoc(doc(db, 'orders', newOrder.id), newOrder);
    } catch (e) {
      console.error("Error submitting order:", e);
    }
  };

  const handleSelectCategoryFromHome = (categoryName: string) => {
    setShopCategoryFilter(categoryName);
    if (activeTab !== 'home') setActiveTab('home');
    
    // Add slight delay to allow rendering if we were on another tab
    setTimeout(() => {
      document.getElementById('shop-products-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const nawariProducts = products.filter((p) => p.category === 'Nawari');
  const summerProducts = products.filter((p) => p.category === 'Summer');
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-theme-cream flex flex-col font-sans text-theme-maroon">
      <AnnouncementBar />
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'shop') {
            handleSelectCategoryFromHome('All');
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          if (activeTab !== 'home') setActiveTab('home');
          setTimeout(() => {
            document.getElementById('shop-products-grid')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <Hero onExplore={() => handleSelectCategoryFromHome('All')} />
            <ShopByCategory onSelectCategory={handleSelectCategoryFromHome} />

            <ShopView
              products={products}
              onSelectProduct={setSelectedProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              initialCategory={shopCategoryFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            
            <FounderSection />
        <div className="border-b border-[#E5D9C5] w-full" />
            <TestimonialSlider />
        <div className="border-b border-[#E5D9C5] w-full" />
            <TrustBanner />
        <div className="border-b border-[#E5D9C5] w-full" />
            <HowToOrderDemo />
            <FaqDemo />
          </>
        )}

        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactView />}
      </main>

      <Footer />

      {/* Modals and Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCartWithSize}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOrderSuccess={handleOrderSuccess}
        clearCart={() => setCartItems([])}
        onShopNow={() => {
          setIsCartOpen(false);
          setShopCategoryFilter('All Sarees');
          setActiveTab('home');
          setTimeout(() => {
            document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={setSelectedProduct}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenAdmin={() => {
          setIsAccountOpen(false);
          setIsAdminOpen(true);
        }}
      />

      <AdminView
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={async (newProd) => {
          try {
            await setDoc(doc(db, 'products', newProd.id), newProd);
          } catch (e) {
            console.error("Error adding product:", e);
          }
        }}
        onDeleteProduct={async (id) => {
          try {
            await deleteDoc(doc(db, 'products', id));
          } catch (e) {
            console.error("Error deleting product:", e);
          }
        }}
        
      />

      {/* Floating WhatsApp Widget */}
      <a 
        href="https://wa.me/917032022203?text=Hello%20Deepu's%20Collection!%20I%20visited%20your%20website%20and%20would%20love%20to%20order%20some%20traditional%20sarees.%20Could%20you%20please%20help%20me%20with%20my%20order%3F" 
        className="fixed bottom-[102px] right-6 w-[64px] h-[64px] bg-[#00E676] text-white rounded-full shadow-[0_4px_15px_rgba(0,230,118,0.4)] hover:bg-[#00c968] transition-all hover:scale-110 z-40 flex items-center justify-center"
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.714-1.464L0 24zm6.273-3.832c1.616.96 3.197 1.48 4.887 1.481 5.485 0 9.948-4.467 9.951-9.957.002-2.66-1.033-5.161-2.915-7.045C16.37 2.76 13.868 1.72 11.2 1.72c-5.49 0-9.956 4.467-9.959 9.96-.001 1.79.475 3.535 1.38 5.093l-.998 3.64 3.731-.977zm12.355-7.37c-.305-.152-1.805-.892-2.084-.993-.28-.101-.484-.152-.687.152-.203.305-.788 1.002-.966 1.206-.178.203-.356.228-.661.076-.305-.152-1.288-.475-2.454-1.517-.908-.81-1.52-1.812-1.698-2.117-.178-.305-.019-.47.133-.621.137-.136.305-.356.457-.533.152-.178.203-.305.305-.508.102-.203.051-.381-.025-.533-.076-.152-.687-1.657-.941-2.27-.248-.599-.5-.517-.688-.527l-.587-.01c-.203 0-.533.076-.813.381-.28.305-1.067 1.042-1.067 2.542 0 1.5 1.092 2.946 1.244 3.15.152.203 2.15 3.284 5.207 4.602.727.314 1.295.5 1.737.64.73.232 1.393.198 1.918.12.585-.087 1.805-.737 2.06-1.45.253-.712.253-1.322.178-1.45-.076-.127-.28-.203-.585-.355z"/></svg>
      </a>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 w-[64px] h-[64px] bg-[#3B1A4A] border-[3px] border-[#c9a24b] text-white rounded-full shadow-[0_0_15px_rgba(59,26,74,0.5)] hover:bg-[#2A1235] transition-all hover:scale-110 z-40 flex items-center justify-center"
        aria-label="View Cart"
      >
        <ShoppingCart className="w-8 h-8" strokeWidth={2.5} />
        {cartItems.reduce((acc, item) => acc + item.quantity, 0) > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#c9a24b] text-white text-[12px] w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-sm">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>
    </div>
  );
}
