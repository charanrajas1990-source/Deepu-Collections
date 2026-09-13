import React, { useState } from 'react';
import { Send, Instagram, Facebook, Twitter, Youtube, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2A0845] text-white pt-16 pb-12 border-t border-[#5C167D]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                Deepu's Collection
              </span>
              <p className="font-sans font-bold text-xs tracking-[0.1em] text-[#c9a24b] uppercase mt-2">
                Handcrafted Elegance, Tailored for You
              </p>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Bringing authentic Indian handlooms, rich Katan silks, Peshwai Nauvaris, and royal bridal lehengas directly from master weavers to your wardrobe.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="p-2.5 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-theme-maroon transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#facebook" className="p-2.5 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-theme-maroon transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="p-2.5 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-theme-maroon transition-colors" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="p-2.5 rounded-full bg-white/10 hover:bg-[#c9a24b] hover:text-theme-maroon transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-[#c9a24b]">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="#home" className="hover:text-[#c9a24b] transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-[#c9a24b] transition-colors">Shop Collection</a></li>
              <li><a href="#nauvari" className="hover:text-[#c9a24b] transition-colors">Nauvari Sarees</a></li>
              <li><a href="#wedding" className="hover:text-[#c9a24b] transition-colors">Wedding Lehengas</a></li>
              <li><a href="#about" className="hover:text-[#c9a24b] transition-colors">About Our Weavers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-[#c9a24b]">Customer Services</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><a href="#contact" className="hover:text-[#c9a24b] transition-colors">Contact Us</a></li>
              <li><a href="#shipping" className="hover:text-[#c9a24b] transition-colors">Track Order</a></li>
              <li><a href="#returns" className="hover:text-[#c9a24b] transition-colors">Returns & Exchange</a></li>
              <li><a href="#faq" className="hover:text-[#c9a24b] transition-colors">Size Guide</a></li>
              <li><a href="#privacy" className="hover:text-[#c9a24b] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-[#c9a24b]">Newsletter</h4>
            <p className="text-gray-300 text-xs mb-4">
              Subscribe to receive exclusive festive launches, private sales, and styling tips.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 p-3 rounded-xl border border-emerald-500/30 text-xs">
                <CheckCircle className="w-4 h-4 shrink-0" /> Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#c9a24b]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#c9a24b] hover:bg-[#b89139] text-theme-maroon font-bold py-2.5 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
                >
                  Subscribe <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 Deepu's Collection Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
