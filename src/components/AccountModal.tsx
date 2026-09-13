import React, { useState } from 'react';
import { X, User, Phone, Lock, CheckCircle2 } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, onOpenAdmin }) => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setOtpSent(true);
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234' || otp.length === 4) {
      setLoggedIn(true);
    } else {
      alert('Invalid OTP. Use 1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-theme-cream rounded-full flex items-center justify-center mx-auto mb-3 text-[#5C167D]">
            <User className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-theme-maroon">Deepu's Collection Account</h3>
          <p className="text-gray-500 text-xs mt-1">Track orders, wishlist & exclusive offers</p>
        </div>

        {loggedIn ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-lg text-theme-maroon">Welcome Back, Deepu Patron!</h4>
            <p className="text-gray-600 text-xs">Logged in via +91 {phone}</p>
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenAdmin();
                }}
                className="w-full bg-[#5C167D] hover:bg-[#4A1066] text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Open Admin Dashboard
              </button>
              <button
                onClick={() => setLoggedIn(false)}
                className="text-gray-500 text-xs hover:underline pt-2"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : otpSent ? (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Enter 4-Digit OTP (Use 1234)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  maxLength={4}
                  required
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D] tracking-widest font-bold"
                  autoFocus
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#5C167D] hover:bg-[#4A1066] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all text-sm"
            >
              Verify & Sign In
            </button>
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-center text-xs text-purple-700 hover:underline pt-1"
            >
              Change phone number
            </button>
          </form>
        ) : (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#5C167D] hover:bg-[#4A1066] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all text-sm"
            >
              Send OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
