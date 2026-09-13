import React from 'react';

export const FounderSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 bg-[#fcfbf9] rounded-3xl p-6 md:p-12 shadow-sm border border-gray-200">
          <div className="w-48 h-48 md:w-72 md:h-72 shrink-0 rounded-full overflow-hidden border-4 border-[#c9a24b] shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80" 
              alt="Founder" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#5C167D] mb-2">Deepu</h3>
            <span className="text-[#c9a24b] font-bold tracking-widest uppercase text-sm">Founder & Chief Designer</span>
            <div className="w-16 h-1 bg-[#c9a24b] my-6 mx-auto md:mx-0"></div>
            <p className="text-xl md:text-2xl font-serif text-[#2A0845] italic mb-6 leading-relaxed">
              "Every thread we weave carries a story of tradition, elegance, and the timeless beauty of Indian heritage. We don't just make sarees; we craft memories."
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              At Deepu's Collection, we believe that true luxury lies in authenticity. From handpicked silks to intricate zari work, every piece in our collection is curated with love and passion to make you feel like royalty on your special day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
