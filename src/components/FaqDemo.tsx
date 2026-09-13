import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqDemo: React.FC = () => {
  const faqs = [
    { q: 'Do you offer Cash on Delivery (COD)?', a: 'Yes, we offer Cash on Delivery across most pin codes in India.' },
    { q: 'What is your return policy?', a: 'We have a hassle-free 7-day return policy for unused items with original tags intact.' },
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express delivery options are available at checkout.' },
    { q: 'Are these sarees pure silk?', a: 'Yes, our premium collections feature 100% certified pure silk and handloom fabrics.' },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq-section" className="scroll-mt-24 md:scroll-mt-32 py-8 md:py-16 px-4 md:px-8 bg-theme-cream">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#5C167D]">Frequently Asked Questions</h2>
          <div className="w-16 h-1 bg-[#c9a24b] mx-auto mt-4"></div>
        </div>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-theme-maroon">{faq.q}</span>
                {openIdx === idx ? <ChevronUp className="text-[#c9a24b] w-5 h-5" /> : <ChevronDown className="text-gray-400 w-5 h-5" />}
              </button>
              {openIdx === idx && (
                <div className="p-4 md:p-6 pt-0 text-gray-600 text-sm border-t border-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
