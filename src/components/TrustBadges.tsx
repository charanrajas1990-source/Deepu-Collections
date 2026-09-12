import React from 'react';
import { Truck, Award, RotateCcw, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Truck className="w-8 h-8 text-[#c9a24b]" />,
      title: 'Free Shipping',
      description: 'On all orders across India above ₹999'
    },
    {
      icon: <Award className="w-8 h-8 text-[#c9a24b]" />,
      title: 'Best Quality',
      description: '100% certified pure handloom fabrics'
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-[#c9a24b]" />,
      title: '7 Days Return',
      description: 'Hassle-free exchange & easy return policy'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#c9a24b]" />,
      title: 'Secure Payment',
      description: 'Encrypted Razorpay & COD checkout'
    }
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-[#F7F2FA] border-y border-purple-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4 border border-purple-50 hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-[#5C167D]/10 rounded-xl flex items-center justify-center shrink-0">
              {b.icon}
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#2A0845] text-base mb-1">
                {b.title}
              </h4>
              <p className="text-gray-600 text-xs leading-relaxed">
                {b.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
