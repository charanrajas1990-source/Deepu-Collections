import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, ShoppingCart, User, Menu, X, ShieldCheck, Home, Folder, ClipboardList, HelpCircle, Phone } from 'lucide-react';
import { CATEGORIES } from '../data';

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
      {/* Top thin banner - mobile only */}
      <div className="flex md:hidden bg-[#2A0845] text-[#c9a24b] py-1.5 text-xs text-center items-center justify-center gap-4 tracking-widest">
        <span>✧</span>
        <span>Elegant Choices</span>
        <span>✧</span>
      </div>

      {/* Main Navbar */}
      <div className="bg-theme-cream text-theme-maroon px-3 sm:px-4 md:px-8 py-3 md:py-2 flex items-center justify-between relative border-t-[3px] border-[#c9a24b] md:border-t-0 md:border-b-4 md:border-b-[#c9a24b] shadow-sm">
        
        {/* Left: Logo and Text */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center justify-start gap-2.5 cursor-pointer shrink-0 lg:ml-12 xl:ml-32"
        >
          <img 
            src={`${import.meta.env.BASE_URL}deepu_logo.PNG`} 
            alt="Logo" 
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-10 md:h-10 object-cover rounded-full shadow-sm" 
          />
          <div className="flex flex-col justify-center">
            <span 
              className="font-serif font-black text-[0.85rem] min-[375px]:text-[0.95rem] sm:text-xl md:text-base leading-none tracking-wider uppercase text-[#4A2A04] drop-shadow-sm"
              style={{ WebkitTextStroke: '0.5px #4A2A04' }}
            >
              DEEPU'S COLLECTION
            </span>
            <span className="font-sans font-bold text-[10px] sm:text-xs md:text-sm tracking-[0.1em] sm:tracking-[0.15em] text-[#c9a24b] uppercase mt-1">WITH ELEGANCE</span>
          </div>
        </div>

        {/* Center: Desktop Links (Horizontal Line) */}
        <div className="hidden lg:flex items-center justify-start flex-1 ml-8 xl:ml-16 mr-4 gap-8 xl:gap-12 text-base font-bold tracking-wider text-[#3B1A4A] uppercase">
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
              <div className="absolute top-full left-0 bg-theme-cream border-t-2 border-[#c9a24b] shadow-xl w-56 py-2 z-50 flex-col gap-1 rounded-b-md flex">
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
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-[#3B1A4A]">
            {isMobileMenuOpen ? <X className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} /> : <Menu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />}
          </button>
          <button onClick={onOpenCart} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-[#3B1A4A] relative">
            <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c9a24b] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Hamburger Menu Side Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-[80%] max-w-[320px] bg-white z-[70] flex flex-col h-[100dvh] overflow-y-auto shadow-2xl transition-transform">
              
              {/* Drawer Header */}
              <div className="bg-[#FCF6E8] px-4 py-4 flex items-center justify-between border-b border-[#E5D9C5] shrink-0">
                <div className="flex items-center justify-start gap-2.5">
                  <img 
                    src={`${import.meta.env.BASE_URL}deepu_logo.PNG`} 
                    alt="Logo" 
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full shadow-sm" 
                  />
                  <div className="flex flex-col justify-center">
                    <span 
                      className="font-serif font-black text-[0.85rem] min-[375px]:text-[0.95rem] sm:text-xl leading-none tracking-wider uppercase text-[#4A2A04] drop-shadow-sm"
                      style={{ WebkitTextStroke: '0.5px #4A2A04' }}
                    >
                      DEEPU'S COLLECTION
                    </span>
                    <span className="font-sans font-bold text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] text-[#c9a24b] uppercase mt-1">WITH ELEGANCE</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 text-[#3B1A4A] hover:bg-black/5 rounded-full transition-colors">
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>

              {/* Main Nav Links */}
              <div className="flex flex-col py-2 bg-white">
                <button onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-left">
                  <Home className="w-[22px] h-[22px] text-[#8C1D35]" strokeWidth={2} />
                  <span className="font-bold text-[#3B1A4A] text-[15px]">Home</span>
                </button>
                <button onClick={() => { 
                  setActiveTab('home'); 
                  setIsMobileMenuOpen(false);
                  setTimeout(() => document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-left">
                  <Folder className="w-[22px] h-[22px] text-[#f59e0b]" strokeWidth={2} fill="#f59e0b" fillOpacity={0.8} />
                  <span className="font-bold text-[#3B1A4A] text-[15px]">Categories</span>
                </button>
                <button onClick={() => { 
                  setActiveTab('home'); 
                  setIsMobileMenuOpen(false);
                  setTimeout(() => document.getElementById('how-to-order-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-left">
                  <ClipboardList className="w-[22px] h-[22px] text-[#8b5cf6]" strokeWidth={2} />
                  <span className="font-bold text-[#3B1A4A] text-[15px]">How to Order</span>
                </button>
                <button onClick={() => { 
                  setActiveTab('home'); 
                  setIsMobileMenuOpen(false);
                  setTimeout(() => document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-left">
                  <HelpCircle className="w-[22px] h-[22px] text-red-500" strokeWidth={2} />
                  <span className="font-bold text-[#3B1A4A] text-[15px]">FAQs</span>
                </button>
                <button onClick={() => { setActiveTab('contact'); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 text-left">
                  <Phone className="w-[22px] h-[22px] text-gray-600" strokeWidth={2} fill="currentColor" fillOpacity={0.8} />
                  <span className="font-bold text-[#3B1A4A] text-[15px]">Contact Us</span>
                </button>
              </div>

              <div className="border-t border-gray-100 my-1 w-full" />

              {/* Saree Types Section */}
              <div className="flex flex-col py-4">
                <span className="px-5 text-[11px] font-bold tracking-[0.1em] text-[#c9a24b] uppercase mb-2">SAREE TYPES AVAILABLE</span>
                
                <button onClick={() => { setActiveTab('shop'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-left text-[#8C1D35]">
                  <span className="text-[20px] leading-none font-black mb-0.5">•</span>
                  <span className="font-bold text-[15px]">All Sarees</span>
                </button>

                {CATEGORIES.filter(c => c.name !== 'All Sarees' && c.name !== 'All').map((cat, idx) => (
                  <button key={idx} onClick={() => { setActiveTab('shop'); setIsMobileMenuOpen(false); }} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-left text-[#3B1A4A]">
                    <span className="text-[20px] leading-none font-black mb-0.5">•</span>
                    <span className="font-bold text-[15px]">{cat.name}</span>
                  </button>
                ))}

              </div>
              
              <div className="mt-auto border-t border-gray-200 bg-gray-50 pb-8">
                {/* Account & Wishlist additions since they're not on mobile top bar */}
                <button onClick={() => { onOpenAccount(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-gray-100 text-[#3B1A4A] border-b border-gray-200">
                  <User className="w-[22px] h-[22px]" strokeWidth={2} /> <span className="font-bold text-[15px]">Account</span>
                </button>
                <button onClick={() => { onOpenWishlist(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-100 text-[#3B1A4A] border-b border-gray-200">
                  <div className="flex items-center gap-4">
                    <Heart className="w-[22px] h-[22px]" strokeWidth={2} /> 
                    <span className="font-bold text-[15px]">Wishlist</span>
                  </div>
                  {wishlistCount > 0 && <span className="bg-rose-500 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
                </button>
                
                {/* Admin Portal link at the bottom */}
                <button onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-4 px-5 py-4 text-emerald-600 hover:bg-gray-100">
                  <ShieldCheck className="w-[22px] h-[22px]" /> <span className="font-bold text-[15px]">Admin Portal</span>
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};
