import React from 'react';
import { Sparkles, Award, HeartHandshake } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[#5C167D] text-sm font-semibold tracking-widest uppercase">Our Heritage</span>
        <h1 className="font-serif text-4xl font-bold text-theme-maroon mt-2">About Deepu's Collection</h1>
        <p className="font-script text-2xl text-[#c9a24b] mt-1">Fashion, Tailored for You</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-purple-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl font-bold text-theme-maroon">Preserving Indian Handloom Craftsmanship</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Founded with a passion for preserving India’s rich textile heritage, Deepu's Collection brings authentic Katan silks, Peshwai Nauvaris, and handcrafted bridal lehengas directly from master artisans in Varanasi, Jaipur, and Yeola.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Every drape tells a story of patience, intricate zari work, and timeless elegance designed to make you feel royal on every occasion.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg h-[350px]">
          <img
            src="https://images.unsplash.com/photo-1610030469668-96d1e3d6b142?auto=format&fit=crop&w=800&q=85"
            alt="Weaver Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-sm text-center">
          <div className="w-12 h-12 bg-theme-cream rounded-xl flex items-center justify-center mx-auto mb-4 text-[#5C167D]">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg mb-2 text-theme-maroon">100% Pure Silk</h3>
          <p className="text-gray-600 text-xs">Certified silk mark handlooms with genuine gold zari thread weaves.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-sm text-center">
          <div className="w-12 h-12 bg-theme-cream rounded-xl flex items-center justify-center mx-auto mb-4 text-[#5C167D]">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg mb-2 text-theme-maroon">Master Artisans</h3>
          <p className="text-gray-600 text-xs">Partnering directly with generational weaver families across India.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-purple-50 shadow-sm text-center">
          <div className="w-12 h-12 bg-theme-cream rounded-xl flex items-center justify-center mx-auto mb-4 text-[#5C167D]">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg mb-2 text-theme-maroon">Tailored For You</h3>
          <p className="text-gray-600 text-xs">Custom blouse stitching and bespoke saree draping styling consultations.</p>
        </div>
      </div>
    </div>
  );
};
