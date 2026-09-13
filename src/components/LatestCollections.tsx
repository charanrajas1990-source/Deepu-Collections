import React from 'react';
import { ArrowRight } from 'lucide-react';

interface LatestCollectionsProps {
  onExploreCollection: (category: string) => void;
}

export const LatestCollections: React.FC<LatestCollectionsProps> = ({ onExploreCollection }) => {
  return (
    <section className="py-10 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <span className="text-[#5C167D] text-sm font-semibold tracking-widest uppercase">
            Heritage & Craft
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-theme-maroon mt-2">
            Latest Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[400px] sm:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85"
              alt="Banarsi Silk"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A0845]/90 via-[#2A0845]/40 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
              <span className="font-script text-[#c9a24b] text-2xl mb-1">Varanasi Heritage</span>
              <h3 className="font-serif text-3xl font-bold mb-3">Banarsi Silk</h3>
              <p className="text-gray-200 text-sm mb-6 max-w-md line-clamp-2">
                Handwoven pure gold zari brocades reflecting centuries of master craftsmanship from the ghats of Varanasi.
              </p>
              <div>
                <button
                  onClick={() => onExploreCollection('Banarsi Silk')}
                  className="bg-white hover:bg-[#c9a24b] text-theme-maroon font-bold px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2 text-sm shadow"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="group relative rounded-2xl overflow-hidden shadow-lg h-[400px] sm:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85"
              alt="For Brides of Rajasthan"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A0845]/90 via-[#2A0845]/40 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
              <span className="font-script text-[#c9a24b] text-2xl mb-1">Royal Bandhani</span>
              <h3 className="font-serif text-3xl font-bold mb-3">For Brides of Rajasthan</h3>
              <p className="text-gray-200 text-sm mb-6 max-w-md line-clamp-2">
                Vibrant tie-dye bandhej and gotta patti work capturing the majestic bridal heritage of the desert state.
              </p>
              <div>
                <button
                  onClick={() => onExploreCollection('Rajasthan')}
                  className="bg-white hover:bg-[#c9a24b] text-theme-maroon font-bold px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2 text-sm shadow"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
