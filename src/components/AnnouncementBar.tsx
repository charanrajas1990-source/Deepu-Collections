import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#2A0845] text-[#c9a24b] py-2 overflow-hidden whitespace-nowrap border-b border-[#c9a24b]/20 flex items-center font-bold text-[10px] sm:text-xs tracking-widest uppercase">
      <div className="animate-[marquee_20s_linear_infinite] inline-block">
        <span className="mx-6">✦ 100% Pure & Traditional</span>
        <span className="mx-6">✦ Pan India Shipping</span>
        <span className="mx-6">✦ Premium Silk Quality</span>
        <span className="mx-6">✦ No Compromise on Elegance</span>
        {/* Repeat for seamless loop */}
        <span className="mx-6">✦ 100% Pure & Traditional</span>
        <span className="mx-6">✦ Pan India Shipping</span>
        <span className="mx-6">✦ Premium Silk Quality</span>
        <span className="mx-6">✦ No Compromise on Elegance</span>
        <span className="mx-6">✦ 100% Pure & Traditional</span>
        <span className="mx-6">✦ Pan India Shipping</span>
        <span className="mx-6">✦ Premium Silk Quality</span>
        <span className="mx-6">✦ No Compromise on Elegance</span>
      </div>
    </div>
  );
};
