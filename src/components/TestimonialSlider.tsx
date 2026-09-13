import React from 'react';

export const TestimonialSlider: React.FC = () => {
  return (
    <section className="py-8 md:py-14 bg-[#2A0845] text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-wide text-[#E6C195]">Customer Reviews</h2>
          <p className="text-gray-300 mt-2 tracking-wider">Real feedback from our beautiful brides and customers</p>
          <div className="w-16 h-1 bg-[#c9a24b] mx-auto mt-4"></div>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[
            { name: "Priya S.", loc: "Hyderabad", text: "The Nauvari saree I bought for my wedding was breathtaking. The pure silk felt amazing!" },
            { name: "Anjali M.", loc: "Bangalore", text: "Incredible craftsmanship and fast delivery. The colors are exactly as shown on the website." },
            { name: "Swathi R.", loc: "Chennai", text: "Deepu's Collection never disappoints. This is my third order and the quality is consistently premium." },
            { name: "Lakshmi K.", loc: "Mumbai", text: "Beautiful packaging and the bridal lehenga was a showstopper. Highly recommend!" }
          ].map((r, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[350px] bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 snap-start flex flex-col hover:bg-white/10 transition-colors">
              <div className="text-[#c9a24b] text-xl mb-4">★★★★★</div>
              <p className="text-gray-300 italic mb-6 flex-grow">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#c9a24b] text-theme-maroon font-bold flex items-center justify-center text-xl">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white">{r.name}</p>
                  <p className="text-xs text-[#E6C195]">{r.loc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
