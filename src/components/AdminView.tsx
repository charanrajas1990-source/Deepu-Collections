import React, { useState } from 'react';
import { X, ShieldCheck, Plus, Trash2, Edit3, Package, DollarSign, Users, ArrowLeft } from 'lucide-react';
import { Product, Order } from '../types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AdminViewProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  orders: Order[];
}

export const AdminView: React.FC<AdminViewProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  orders,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [isAdding, setIsAdding] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newFabric, setNewFabric] = useState('Pure Silk');
  const [newCategory, setNewCategory] = useState<'Cotton' | 'Nylon' | 'Linen' | 'Wedding Lehnga' | 'Nawari' | 'Summer' | 'Banarsi Silk' | 'Rajasthan'>('Nawari');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: 'PROD-' + Date.now(),
      name: newName,
      price: Number(newPrice) || 3999,
      fabric: newFabric,
      category: newCategory,
      image: newImage,
      gallery: [newImage],
      sizes: ['Standard (6.3m with Blouse)', 'Free Size'],
      description: "Handcrafted premium saree from Deepu's Collection collection.",
      badge: 'New Arrival',
    };
    onAddProduct(product);
    setIsAdding(false);
    setNewName('');
    setNewPrice('');
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        <div className="bg-[#5C167D] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#c9a24b]" />
            <div>
              <h2 className="font-serif font-bold text-xl">Deepu's Collection Admin Portal</h2>
              <p className="text-xs text-purple-200">Inventory Management & Order Fulfillment</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-12 max-w-md mx-auto my-auto text-center">
            <h3 className="font-serif text-2xl font-bold text-[#2A0845] mb-2">Admin Authentication</h3>
            <p className="text-gray-500 text-xs mb-6">Enter admin passcode to access inventory and orders.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <p className="text-red-500 text-xs text-center">{error}</p>}
              <input
                type="email"
                required
                placeholder="Username (Email)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                autoFocus
              />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
              />
              <button
                type="submit"
                className="w-full bg-[#5C167D] hover:bg-[#4A1066] text-white font-bold py-3 rounded-xl text-sm shadow transition-colors"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className="bg-gray-50 border-b border-purple-100 p-4 px-6 flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'products'
                      ? 'bg-[#5C167D] text-white shadow'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Products ({products.length})
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'orders'
                      ? 'bg-[#5C167D] text-white shadow'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Orders ({orders.length})
                </button>
              </div>

              {activeTab === 'products' && (
                <button
                  onClick={() => setIsAdding(!isAdding)}
                  className="bg-[#c9a24b] hover:bg-[#b89139] text-[#2A0845] text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              )}
            </div>

            <div className="p-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-purple-100">
              <div className="bg-white p-4 rounded-xl border border-purple-50 shadow-sm flex items-center gap-3">
                <Package className="w-8 h-8 text-[#5C167D] p-2 bg-[#F7F2FA] rounded-lg" />
                <div>
                  <span className="text-xs text-gray-500 font-medium">Total Products</span>
                  <p className="font-serif font-bold text-xl text-[#2A0845]">{products.length}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-50 shadow-sm flex items-center gap-3">
                <Users className="w-8 h-8 text-[#5C167D] p-2 bg-[#F7F2FA] rounded-lg" />
                <div>
                  <span className="text-xs text-gray-500 font-medium">Total Orders</span>
                  <p className="font-serif font-bold text-xl text-[#2A0845]">{orders.length}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-50 shadow-sm flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-[#5C167D] p-2 bg-[#F7F2FA] rounded-lg" />
                <div>
                  <span className="text-xs text-gray-500 font-medium">Total Revenue</span>
                  <p className="font-serif font-bold text-xl text-[#5C167D]">₹{totalRevenue.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            <div className="p-6 flex-grow overflow-y-auto">
              {isAdding && (
                <div className="bg-white p-6 rounded-2xl border border-purple-200 mb-6 shadow-md animate-fadeIn">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-serif font-bold text-lg text-[#2A0845]">Add New Saree Product</h4>
                    <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Banarasi Brocade"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        required
                        placeholder="4999"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Fabric</label>
                      <input
                        type="text"
                        required
                        placeholder="Pure Katan Silk"
                        value={newFabric}
                        onChange={(e) => setNewFabric(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Category</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                      >
                        <option value="Nawari">Nawari</option>
                        <option value="Summer">Summer</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Nylon">Nylon</option>
                        <option value="Linen">Linen</option>
                        <option value="Wedding Lehnga">Wedding Lehnga</option>
                        <option value="Banarsi Silk">Banarsi Silk</option>
                        <option value="Rajasthan">Rajasthan</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Image URL</label>
                      <input
                        type="url"
                        required
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-[#5C167D]"
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#5C167D] hover:bg-[#4A1066] text-white text-xs font-bold px-6 py-2 rounded-xl shadow"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'products' ? (
                <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#F7F2FA] text-[#5C167D] text-xs font-bold uppercase tracking-wider border-b border-purple-100">
                        <th className="p-4">Saree</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50 text-sm">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-purple-50/40 transition-colors">
                          <td className="p-4">
                            <img src={p.image} alt="" className="w-12 h-14 object-cover rounded-lg shadow-sm" />
                          </td>
                          <td className="p-4 font-serif font-medium text-[#2A0845]">{p.name}</td>
                          <td className="p-4 text-xs font-semibold text-purple-700">{p.category}</td>
                          <td className="p-4 font-bold text-[#5C167D]">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm">
                  {orders.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm font-medium">No orders received yet.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F7F2FA] text-[#5C167D] text-xs font-bold uppercase tracking-wider border-b border-purple-100">
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Phone</th>
                          <th className="p-4">Items</th>
                          <th className="p-4">Total</th>
                          <th className="p-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-50 text-sm">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-purple-50/40 transition-colors">
                            <td className="p-4 font-bold text-[#5C167D]">{o.id}</td>
                            <td className="p-4 font-medium text-[#2A0845]">{o.customerName}</td>
                            <td className="p-4 text-xs text-gray-600">{o.customerPhone}</td>
                            <td className="p-4 text-xs text-gray-600">{o.items.length} items</td>
                            <td className="p-4 font-bold text-emerald-600">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                            <td className="p-4 text-xs text-gray-500">{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Trigger recompile
