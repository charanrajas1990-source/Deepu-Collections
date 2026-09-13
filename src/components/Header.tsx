import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, ShoppingCart, User, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  searchQuery,
  setSearchQuery,
  onOpenAdmin,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSareeMenuOpen, setIsSareeMenuOpen] = useState(false);
  const sareeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sareeMenuRef.current && !sareeMenuRef.current.contains(event.target as Node)) {
        setIsSareeMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const categories = [
    'Georgette Sarees',
    'Pattu Sarees',
    'Fancy Sarees',
    'Chinon Sarees',
    'Chiffon Sarees',
    'Matka Crepe Sarees',
    'Digital Sarees',
    'Tussure Sarees',
    'Instagram Trending Sarees'
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm flex flex-col font-serif">
      {/* Top thin banner */}
      <div className="hidden md:flex bg-[#2A0845] text-[#c9a24b] py-1.5 text-xs text-center items-center justify-center gap-4 tracking-widest">
        <span>✧</span>
        <span className="hidden sm:inline">Timeless Traditions</span>
        <span className="hidden sm:inline">|</span>
        <span>Elegant Choices</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">Exclusive Ethnic Wear</span>
        <span>✧</span>
      </div>

      {/* Main Navbar */}
      <div className="bg-[#fcfbf9] text-[#2A0845] px-3 sm:px-4 md:px-8 py-3 md:py-4 flex items-center justify-between relative border-t-[3px] border-[#c9a24b] md:border-t-0 shadow-sm">
        
        {/* Left: Logo and Text */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center justify-start gap-2.5 cursor-pointer shrink-0"
        >
          <img 
            src={`${import.meta.env.BASE_URL}deepu_logo.jpg`} 
            alt="Logo" 
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-full shadow-sm" 
          />
          <div className="flex flex-col justify-center">
            <span 
              className="font-serif font-extrabold text-[1.1rem] sm:text-xl md:text-2xl leading-none tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2CD] via-[#C9A24B] to-[#593C22]"
              style={{ filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.5)) drop-shadow(0px 1px 0px rgba(255,255,255,0.2))' }}
            >
              DEEPU'S COLLECTION
            </span>
            <span className="font-sans font-bold text-[9px] sm:text-[10px] md:text-base tracking-[0.2em] text-[#c9a24b] uppercase mt-1">WITH ELEGANCE</span>
          </div>
        </div>

        {/* Center: Desktop Links (Horizontal Line) */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-4 gap-4 xl:gap-8 text-[10px] xl:text-xs font-bold tracking-widest text-[#5C167D] uppercase">
           <button onClick={() => setActiveTab('home')} className="hover:text-[#c9a24b] transition-colors whitespace-nowrap">HOME</button>
           <button 
             onClick={() => {
               setActiveTab('home');
               setTimeout(() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
             }} 
             className="hover:text-[#c9a24b] transition-colors whitespace-nowrap"
           >
             CATEGORIES
           </button>
          
          <div className="relative" ref={sareeMenuRef}>
            <button 
              onClick={() => setIsSareeMenuOpen(!isSareeMenuOpen)}
              className="hover:text-[#c9a24b] transition-colors whitespace-nowrap flex items-center gap-1 py-4"
            >
              SAREE TYPES <span className="text-[8px] mt-0.5">▼</span>
            </button>
            {/* Dropdown Box */}
            {isSareeMenuOpen && (
              <div className="absolute top-full left-0 bg-[#fcfbf9] border-t-2 border-[#c9a24b] shadow-xl w-56 py-2 z-50 flex-col gap-1 rounded-b-md flex">
                {categories.map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => {
                      setActiveTab('home');
                      setIsSareeMenuOpen(false);
                      // Add specific action for saree type later if needed
                    }}
                    className="text-left px-5 py-2.5 hover:bg-[#f2ebd9] hover:text-[#c9a24b] text-[10px] font-bold tracking-widest text-[#5C167D] uppercase transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => document.getElementById('how-to-order-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} 
            className="hover:text-[#c9a24b] transition-colors whitespace-nowrap"
          >
            HOW TO ORDER
          </button>
          <button 
            onClick={() => {
              setActiveTab('home');
              setTimeout(() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }} 
            className="hover:text-[#c9a24b] transition-colors whitespace-nowrap"
          >
            FAQS
          </button>
          <button onClick={() => setActiveTab('contact')} className="hover:text-[#c9a24b] transition-colors whitespace-nowrap">CONTACT US</button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-[#E6C195]">
            {isMobileMenuOpen ? <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} /> : <Menu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />}
          </button>
          <button onClick={onOpenCart} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-[#E6C195] relative">
            <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c9a24b] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Hamburger Menu Dropdown (Visible on all screens for icons) */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            style={{ top: '100%' }} // Starts just below the header
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        {isMobileMenuOpen && (
          <div className="absolute right-0 top-full w-1/2 md:w-72 bg-[#fcfbf9] border-t border-l border-gray-200 md:border md:rounded-bl-xl px-4 md:px-6 py-4 flex flex-col gap-4 shadow-xl z-50 h-[100vh] overflow-y-auto pb-32">
            <div className="flex flex-col gap-3 text-sm font-semibold tracking-widest text-[#5C167D]">
              
              {/* Mobile-only page links */}
              <div className="lg:hidden flex flex-col gap-3 pb-3 border-b border-gray-100">
                <button onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#c9a24b]">HOME</button>
                <button onClick={() => { 
                  setActiveTab('home'); 
                  setIsMobileMenuOpen(false);
                  setTimeout(() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="text-left py-2 hover:text-[#c9a24b]">CATEGORIES</button>
                <button onClick={() => { setActiveTab('shop'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#c9a24b]">SAREE TYPES</button>
                <button onClick={() => { 
                  setActiveTab('home'); 
                  setIsMobileMenuOpen(false);
                  setTimeout(() => document.getElementById('how-to-order-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="text-left py-2 hover:text-[#c9a24b]">HOW TO ORDER</button>
                <button onClick={() => { 
                  setActiveTab('home'); 
                  setIsMobileMenuOpen(false);
                  setTimeout(() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="text-left py-2 hover:text-[#c9a24b]">FAQS</button>
                <button onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#c9a24b]">CONTACT US</button>
              </div>

              {/* Action Icons (Moved from main navbar) */}
              <button onClick={() => { setIsMobileMenuOpen(false); }} className="flex items-center gap-4 py-2 hover:text-[#c9a24b]">
                <Search className="w-5 h-5" /> SEARCH
              </button>
              
              <button onClick={() => { onOpenAccount(); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 py-2 hover:text-[#c9a24b]">
                <User className="w-5 h-5" /> ACCOUNT
              </button>
              
              <button onClick={() => { onOpenWishlist(); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 py-2 hover:text-[#c9a24b]">
                <div className="relative">
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">{wishlistCount}</span>}
                </div>
                WISHLIST
              </button>
              
              <button onClick={() => { onOpenCart(); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 py-2 hover:text-[#c9a24b]">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#c9a24b] text-[#2A0845] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                </div>
                SHOPPING CART
              </button>
              
              <button onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 py-2 text-emerald-600 hover:text-emerald-500 mt-2 border-t border-gray-100 pt-4">
                <ShieldCheck className="w-5 h-5" /> ADMIN PORTAL
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
