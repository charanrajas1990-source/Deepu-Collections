import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ShoppingCart, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onOrderSuccess: (order: Order) => void;
  clearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
  clearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = discountApplied || subtotal >= 5999 ? subtotal * 0.2 : 0;
  const finalTotal = Math.round(subtotal - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'EXTRA20') {
      setDiscountApplied(true);
    } else {
      alert('Invalid promo code. Try EXTRA20');
    }
  };

  const handleRazorpayCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill in all delivery details.');
      return;
    }

    setIsProcessing(true);

    // Simulate Razorpay payment gateway popup
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: Order = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        customerName,
        customerPhone,
        items: [...cartItems],
        totalAmount: finalTotal,
        date: new Date().toLocaleString(),
        status: 'Pending',
      };
      setOrderCompleted(newOrder);
      onOrderSuccess(newOrder);
      clearCart();
    }, 2000);
  };

  const getWhatsAppLink = (order: Order) => {
    const text = `Hello Deepu's Collection! I have successfully placed order *${order.id}* for ₹${order.totalAmount}. My name is ${order.customerName}. Please confirm shipment!`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn" onClick={onClose}>
      <div className="bg-white w-full max-w-md h-[100dvh] shadow-2xl flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
        
        {/* Cart Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-[#8C1D35]">
            <ShoppingCart className="w-6 h-6" strokeWidth={2} />
            <h2 className="font-serif font-bold text-xl md:text-2xl tracking-wide">Your Cart</h2>
          </div>
          <button onClick={onClose} className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" strokeWidth={2} />
          </button>
        </div>

        {orderCompleted ? (
          <div className="p-8 flex flex-col items-center justify-center text-center flex-grow">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-theme-maroon mb-2">Order Successful!</h3>
            <p className="text-gray-600 text-sm mb-6">
              Thank you for shopping with Deepu's Collection. Order ID: <strong className="text-[#5C167D]">{orderCompleted.id}</strong>
            </p>

            <a
              href={getWhatsAppLink(orderCompleted)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mb-4"
            >
              <MessageCircle className="w-5 h-5" /> Send Order via WhatsApp
            </a>

            <button
              onClick={() => {
                setOrderCompleted(null);
                setIsCheckoutModalOpen(false);
                onClose();
              }}
              className="text-[#5C167D] font-semibold text-sm hover:underline"
            >
              ← Continue Shopping
            </button>
          </div>
        ) : isCheckoutModalOpen ? (
          <div className="p-6 flex-grow overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-xl font-bold text-theme-maroon">Checkout Details</h3>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-xs text-purple-700 hover:underline"
              >
                ← Back to Cart
              </button>
            </div>

            <form onSubmit={handleRazorpayCheckout} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Deepu Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  required
                  rows={3}
                  placeholder="House no, Street, City, Pincode"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                />
              </div>

              <div className="bg-theme-cream p-4 rounded-xl border border-purple-100 my-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Total Amount Payable:</span>
                  <span className="font-bold text-[#5C167D] text-base">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium">✓ Razorpay 256-bit SSL Secure Payment Gateway Placeholder</p>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#5C167D] hover:bg-[#4A1066] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing Payment...' : `Pay ₹{finalTotal.toLocaleString('en-IN')} via Razorpay`}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6 mt-[-10vh]">
                  <div className="relative mb-6">
                    <ShoppingCart className="w-[80px] h-[80px] text-[#60b3d1]" strokeWidth={1.5} />
                    {/* Simulated red cart handle accent */}
                    <div className="absolute top-2 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                  </div>
                  <p className="font-sans font-medium text-[16px] text-[#5c4033] mb-6 tracking-wide">
                    Your cart is empty.
                  </p>
                  <button 
                    onClick={onClose} 
                    className="bg-[#dca11d] hover:bg-[#c48f19] text-[#5c4033] font-bold text-[14px] px-8 py-3 rounded-md shadow-sm transition-colors"
                  >
                    Shop Sarees
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <h4 className="font-serif font-medium text-[#8C1D35] text-sm line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-xs text-gray-500">Size: {item.selectedSize}</span>
                          <p className="font-bold text-[#8C1D35] text-sm mt-1">
                            ₹{item.product.price.toLocaleString('en-IN')}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-gray-200">
                            <button
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="text-gray-500 hover:text-black font-bold px-1"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="text-gray-500 hover:text-black font-bold px-1"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <form onSubmit={handleApplyPromo} className="flex gap-2 mt-6">
                    <input
                      type="text"
                      placeholder="Promo Code (EXTRA20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#8C1D35] uppercase focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-[#c9a24b] text-[#5c4033] text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#b89139]"
                    >
                      Apply
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Permanent Footer (Visible even when empty to match requested design) */}
            <div className="p-6 bg-[#FCF6E8] space-y-4 border-t border-[#E5D9C5] shrink-0">
              <div className="space-y-3 text-[14px] text-[#5c4033] tracking-wide">
                <div className="flex justify-between">
                  <span className="opacity-90">Items Weight:</span>
                  <span className="opacity-90">0g</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Subtotal:</span>
                  <span className="opacity-90">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Shipping:</span>
                  <span className="opacity-90">₹0</span>
                </div>
                
                <div className="border-t border-dashed border-[#d1c4a9] my-3" />
                
                <div className="flex justify-between text-[17px] font-black text-[#8C1D35] pt-1">
                  <span>Total Amount:</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => { if (cartItems.length > 0) setIsCheckoutModalOpen(true); }}
                disabled={cartItems.length === 0}
                className={`w-full font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center text-[15px] ${cartItems.length > 0 ? 'bg-[#8C1D35] text-white hover:bg-[#6b1427] shadow-md' : 'bg-[#8C1D35] text-white opacity-95 cursor-not-allowed'}`}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
