import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
        <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-[#F7F2FA]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#5C167D]" />
            <h2 className="font-serif font-bold text-xl text-[#2A0845]">Your Shopping Cart</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleted ? (
          <div className="p-8 flex flex-col items-center justify-center text-center flex-grow">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2A0845] mb-2">Order Successful!</h3>
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
              Continue Shopping
            </button>
          </div>
        ) : isCheckoutModalOpen ? (
          <div className="p-6 flex-grow overflow-y-auto">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#2A0845]">Razorpay Secure Checkout</h3>
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

              <div className="bg-[#F7F2FA] p-4 rounded-xl border border-purple-100 my-4">
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
                {isProcessing ? 'Processing Payment...' : `Pay ₹${finalTotal.toLocaleString('en-IN')} via Razorpay`}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="p-6 flex-grow overflow-y-auto space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p className="font-medium text-base">Your cart is empty</p>
                  <p className="text-xs text-gray-400 mt-1">Explore our exclusive saree collection.</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-purple-50 relative">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-xl shrink-0"
                    />
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-serif font-medium text-[#2A0845] text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-xs text-gray-500">Size: {item.selectedSize}</span>
                        <p className="font-bold text-[#5C167D] text-sm mt-1">
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
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-purple-100 bg-[#F7F2FA] space-y-4">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (EXTRA20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs text-[#2A0845] uppercase focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#5C167D] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#4A1066]"
                  >
                    Apply
                  </button>
                </form>

                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {(discount > 0 || subtotal >= 5999) && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Discount (20% Off):</span>
                      <span>-₹{Math.round(discount).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-[#2A0845] pt-2 border-t border-purple-200">
                    <span>Total:</span>
                    <span className="text-[#5C167D]">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full bg-[#c9a24b] hover:bg-[#b89139] text-[#2A0845] font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
