"use client";
import React, { useState, useEffect } from 'react';
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
    </div>
  );
}
