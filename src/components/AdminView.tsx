import React, { useState } from 'react';
import { 
  X, ShieldCheck, Plus, Trash2, Edit3, Package, DollarSign, Users, 
  ArrowLeft, Activity, LayoutDashboard, Grid, CreditCard, Users2, 
  FileText, BarChart2, Bell, HelpCircle, Settings, LogOut, 
  Mail, Search, ChevronDown, Check, MoreHorizontal, Phone, MessageCircle, Minus
} from 'lucide-react';
import { Product, Order } from '../types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface AdminViewProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'products' | 'customers' | 'reports'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Product Add states
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newFabric, setNewFabric] = useState('');
  const [newCategory, setNewCategory] = useState<'Nawari' | 'Summer' | 'Cotton' | 'Nylon' | 'Linen' | 'Wedding Lehnga' | 'Banarsi Silk' | 'Rajasthan'>('Nawari');

  React.useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const fetchedOrders = snapshot.docs.map(doc => doc.data() as Order);
        setOrders(fetchedOrders.sort((a,b) => b.date.localeCompare(a.date)));
      });
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setError('');
    } catch (err: any) {
      setError('Invalid credentials');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      price: parseInt(newPrice),
      image: newImage,
      gallery: [newImage],
      sizes: ['Standard'],
      description: 'New product added via admin portal.',
      category: newCategory,
      fabric: newFabric,
    });
    setIsAdding(false);
    setNewName(''); setNewPrice(''); setNewImage(''); setNewFabric('');
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F9F9F6] flex items-center justify-center animate-fadeIn">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <div className="bg-white p-8 rounded-[24px] shadow-xl max-w-sm w-full mx-4 border border-gray-100">
          <div className="w-16 h-16 bg-[#1C2128] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-center text-[#1C2128] mb-8 font-sans">Admin Access</h2>
          {error && <p className="text-rose-500 text-sm text-center mb-4 bg-rose-50 p-2 rounded-lg">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1C2128]" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#1C2128]" />
            </div>
            <button type="submit" className="w-full bg-[#1C2128] hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-md transition-all mt-2">
              Login to Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return <span className="bg-[#98F5B8] text-[#1a5b33] px-3 py-1 rounded-md text-xs font-bold border border-[#7edfa2]">Completed</span>;
      case 'delivered': return <span className="bg-[#FFC094] text-[#7a3b10] px-3 py-1 rounded-md text-xs font-bold border border-[#f2af81]">Delivered</span>;
      default: return <span className="bg-[#FDE17A] text-[#785b0a] px-3 py-1 rounded-md text-xs font-bold border border-[#f2d468]">Paid</span>;
    }
  };

  const getDummyAvatar = (name: string) => {
    const colors = ['bg-rose-100 text-rose-600', 'bg-blue-100 text-blue-600', 'bg-emerald-100 text-emerald-600', 'bg-purple-100 text-purple-600', 'bg-amber-100 text-amber-600'];
    const color = colors[name.length % colors.length];
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${color}`}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: Grid, label: 'Orders' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'customers', icon: Users2, label: 'Customers' },
    { id: 'reports', icon: FileText, label: 'Reports' },
  ];

  const bottomItems = [
    { icon: BarChart2, label: 'Statistic' },
    { icon: Bell, label: 'Notification' },
    { icon: HelpCircle, label: 'Help' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#F9F9F6] font-sans flex text-[#1C2128]">
      {/* Left Sidebar */}
      <div className="w-[260px] bg-[#1C2128] text-gray-400 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 text-white mb-4">
          <Activity className="w-6 h-6 text-white" />
          <span className="font-bold text-xl tracking-tight">DeepuAdmin</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setSelectedOrder(null); }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-medium transition-all ${activeTab === item.id ? 'bg-white text-[#1C2128] shadow-sm' : 'hover:bg-white/5 hover:text-gray-200'}`}
            >
              <item.icon className="w-5 h-5" strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {item.label}
            </button>
          ))}

          <div className="pt-6 pb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Other</div>
          {bottomItems.map((item, i) => (
            <button key={i} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-medium hover:bg-white/5 hover:text-gray-200 transition-all">
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-medium hover:bg-white/5 hover:text-gray-200 transition-all">
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-[88px] px-8 flex items-center justify-between shrink-0">
          <h1 className="text-3xl font-bold tracking-tight text-[#1C2128] capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
              <Mail className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
              <Search className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 ml-2 pl-6 border-l border-gray-300">
              <div className="w-10 h-10 rounded-full bg-purple-100 overflow-hidden border border-gray-200">
                <img src="https://i.pravatar.cc/150?img=47" alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm">Deepu Admin</div>
                <div className="text-xs text-gray-500">admin@deepuscollection.com</div>
              </div>
            </div>
            <button onClick={onClose} className="ml-4 w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors" title="Close Admin">
               <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {activeTab === 'orders' && (
            <div className="max-w-6xl">
              {/* Filters */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3">
                  <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-gray-50">
                    Any status <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-gray-50">
                    ₹0 — ₹10,000 <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm hover:bg-gray-50">
                  Sort by Date <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden p-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-bold text-gray-500 uppercase border-b border-gray-100">
                      <th className="p-4 pl-6 font-medium flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md bg-[#1C2128] flex items-center justify-center"><Minus className="w-3 h-3 text-white" /></div>
                        Order
                      </th>
                      <th className="p-4 font-medium">Customer</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Total</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-gray-400">No orders found.</td>
                      </tr>
                    ) : (
                      orders.map((order, idx) => {
                        const isSelected = selectedOrder?.id === order.id;
                        return (
                          <tr 
                            key={order.id} 
                            onClick={() => setSelectedOrder(order)}
                            className={`cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${isSelected ? 'bg-gray-50' : 'hover:bg-gray-50/50'}`}
                          >
                            <td className="p-4 pl-6 font-medium text-gray-600 flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${isSelected ? 'bg-[#1C2128] border-[#1C2128]' : 'border-gray-300 bg-white'}`}>
                                {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                              </div>
                              #{order.id.replace('DC-', '')}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3 font-semibold text-[#1C2128]">
                                {getDummyAvatar(order.customerName)}
                                {order.customerName}
                              </div>
                            </td>
                            <td className="p-4">{getStatusBadge(order.status || 'Paid')}</td>
                            <td className="p-4 font-semibold text-[#1C2128]">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                            <td className="p-4 text-gray-600">{order.date.split(',')[0]}</td>
                            <td className="p-4 text-gray-400"><MoreHorizontal className="w-5 h-5 ml-auto" /></td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="max-w-6xl">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => setIsAdding(!isAdding)} className="bg-[#1C2128] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-black shadow-md">
                  {isAdding ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Product</>}
                </button>
              </div>
              
              {isAdding && (
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 mb-6">
                  {/* Reuse old add product form logic, simplified styling */}
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Simplified for brevity in new UI */}
                    <input type="text" required placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2" />
                    <input type="number" required placeholder="Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2" />
                    <input type="url" required placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2 sm:col-span-2" />
                    <button type="submit" className="bg-[#1C2128] text-white font-bold py-2 rounded-xl sm:col-span-2">Save Product</button>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden p-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-bold text-gray-500 uppercase border-b border-gray-100">
                      <th className="p-4 pl-6">Saree</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="p-4 pl-6"><img src={p.image} className="w-12 h-14 object-cover rounded-lg" /></td>
                        <td className="p-4 font-medium text-[#1C2128]">{p.name}</td>
                        <td className="p-4 font-bold text-[#1C2128]">₹{p.price.toLocaleString('en-IN')}</td>
                        <td className="p-4">
                          <button onClick={() => onDeleteProduct(p.id)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['dashboard', 'customers', 'reports'].includes(activeTab) && (
             <div className="max-w-6xl text-center py-20 bg-white rounded-[24px] border border-gray-100">
                <h2 className="text-xl font-bold text-gray-400">This section is under construction.</h2>
             </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Order Details (Only visible when an order is selected) */}
      {selectedOrder && activeTab === 'orders' && (
        <div className="w-[380px] bg-white border-l border-gray-200 shadow-xl flex flex-col shrink-0 overflow-y-auto animate-fadeIn">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-2xl font-bold text-[#1C2128]">Order #{selectedOrder.id.replace('DC-', '')}</h2>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge(selectedOrder.status || 'Paid')}
                <span className="text-xs font-semibold text-gray-500">{selectedOrder.date.split(',')[0]}</span>
              </div>
            </div>
            <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-8 flex flex-col items-center border-b border-gray-100">
            <div className="w-24 h-24 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-3xl font-bold mb-4 shadow-sm border-4 border-white">
              {selectedOrder.customerName.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-lg font-bold text-[#1C2128] mb-4">{selectedOrder.customerName}</h3>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-[#1C2128] text-white flex items-center justify-center hover:bg-black shadow-md transition-transform hover:scale-105"><Mail className="w-4 h-4" /></button>
              <button className="w-10 h-10 rounded-full bg-[#F9F9F6] border border-gray-200 text-[#1C2128] flex items-center justify-center hover:bg-gray-100 shadow-sm transition-transform hover:scale-105"><Phone className="w-4 h-4" /></button>
              <button className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20b858] shadow-md transition-transform hover:scale-105"><MessageCircle className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="p-6 flex-1">
            <h4 className="text-sm font-bold text-gray-900 mb-4">Order items</h4>
            <div className="space-y-4">
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-14 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                    <img src={item.product.image} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-[#1C2128] truncate">{item.product.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Size: {item.selectedSize}</div>
                    <div className="font-bold text-[#1C2128] text-sm mt-1">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-50/50 mt-auto shrink-0 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-2xl font-bold text-[#1C2128]">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-[#1C2128] hover:bg-black text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center gap-2 text-sm">
                Track <Activity className="w-4 h-4" />
              </button>
              <button className="flex-1 bg-[#FDE17A] hover:bg-[#f2d468] text-[#785b0a] font-bold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center gap-2 text-sm border border-[#f2d468]">
                Refund <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
