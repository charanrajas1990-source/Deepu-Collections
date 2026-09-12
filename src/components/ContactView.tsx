import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-[#5C167D] text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
        <h1 className="font-serif text-4xl font-bold text-[#2A0845] mt-2">Contact Deepu's Collection</h1>
        <p className="text-gray-600 text-sm mt-2">We would love to assist you with saree styling, wedding orders, or inquiries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-[#5C167D] text-white p-8 rounded-3xl shadow-lg space-y-6">
          <h3 className="font-serif text-2xl font-bold mb-4">Contact Information</h3>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-[#c9a24b] shrink-0 mt-1" />
            <p className="text-sm text-purple-100">Kapavaram, Korukonda Mandalam, near Rajahmundry, East Godavari District, Andhra Pradesh, 533289</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-[#c9a24b] shrink-0" />
              <p className="text-sm text-purple-100">9182319328</p>
            </div>
            <div className="flex items-center gap-4 pl-9">
              <p className="text-sm text-purple-100">9182745115</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-[#c9a24b] shrink-0" />
            <p className="text-sm text-purple-100">deepu4dh@gmail.com</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-purple-100">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#2A0845]">Message Sent Successfully!</h3>
              <p className="text-gray-600 text-sm">Thank you for reaching out. Our fashion consultant will get back to you shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-[#5C167D] text-white text-xs font-semibold px-6 py-2.5 rounded-xl shadow mt-4"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#2A0845] mb-6">Send Us a Message</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Message / Inquiry</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your saree requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#5C167D] hover:bg-[#4A1066] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
              >
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
