import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product, Order } from '../types';
import { LayoutDashboard, Package, ShoppingBag, Users, Plus, Image as ImageIcon, CheckCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'stats' | 'products' | 'orders' | 'banner'>('stats');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: '', description: '', mainImg: '', price: 0, discount: 0, category: 'Fashion', gender: 'Unisex', sizes: '[]', carousel: '[]'
  });

  useEffect(() => {
    fetch('/api/fetch-products').then(res => res.json()).then(setProducts);
    fetch('/api/fetch-all-orders').then(res => res.json()).then(setOrders);
    fetch('/api/fetch-admin-config').then(res => res.json()).then(data => setBannerUrl(data.bannerUrl));
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/add-new-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      if (res.ok) {
        alert('Product added!');
        fetch('/api/fetch-products').then(res => res.json()).then(setProducts);
        setActiveTab('products');
      }
    } catch (error) {
      alert('Error adding product');
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await fetch(`/api/update-order-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetch('/api/fetch-all-orders').then(res => res.json()).then(setOrders);
    } catch (error) {
      alert('Error updating status');
    }
  };

  const handleUpdateBanner = async () => {
    try {
      await fetch('/api/update-banner', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bannerUrl })
      });
      alert('Banner updated!');
    } catch (error) {
      alert('Error updating banner');
    }
  };

  if (user?.usertype !== 'admin') return <div className="p-20 text-center">Unauthorized</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Admin Nav */}
        <aside className="w-full md:w-64 space-y-2">
          <h2 className="text-xl font-bold mb-6 px-4">ShopEZ Admin</h2>
          {[
            { id: 'stats', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'All Products', icon: ShoppingBag },
            { id: 'orders', label: 'All Orders', icon: Package },
            { id: 'banner', label: 'Banner & Config', icon: ImageIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <item.icon className="w-5 h-5" /> {item.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <main className="flex-1">
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', value: '124', icon: Users, color: 'bg-blue-500' },
                { label: 'Total Products', value: products.length, icon: ShoppingBag, color: 'bg-emerald-500' },
                { label: 'Total Orders', value: orders.length, icon: Package, color: 'bg-violet-500' },
                { label: 'Revenue', value: '₹45,230', icon: CheckCircle, color: 'bg-amber-500' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Products</h3>
                <button 
                  onClick={() => setActiveTab('banner')} // Simplified for demo, usually a modal
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" /> Add New
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Discount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {products.map(p => (
                      <tr key={p.id}>
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img src={p.mainImg} alt="" className="w-10 h-10 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <span className="font-bold text-gray-900">{p.title}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{p.category}</td>
                        <td className="px-6 py-4 text-sm font-bold">₹{p.price}</td>
                        <td className="px-6 py-4 text-sm text-red-500 font-bold">{p.discount}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">All Orders</h3>
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-6">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Order # {order.id}</p>
                      <h4 className="font-bold text-gray-900">{order.name}</h4>
                      <p className="text-sm text-gray-500">{order.email} • {order.mobile}</p>
                      <p className="text-sm text-gray-500 mt-2">{order.address}, {order.pincode}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">₹{Math.round(order.totalPrice)}</p>
                        <p className="text-xs text-gray-400">{order.orderDate}</p>
                      </div>
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="mt-4 px-3 py-1 border border-gray-200 rounded-md text-sm font-bold bg-gray-50"
                      >
                        <option value="order placed">Order Placed</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'banner' && (
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Update Banner</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL</label>
                    <input
                      type="text"
                      value={bannerUrl}
                      onChange={e => setBannerUrl(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleUpdateBanner}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700"
                  >
                    Update Banner
                  </button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea required rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Main Image URL</label>
                    <input type="text" required value={newProduct.mainImg} onChange={e => setNewProduct({...newProduct, mainImg: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input type="text" required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input type="number" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                    <input type="number" required value={newProduct.discount} onChange={e => setNewProduct({...newProduct, discount: Number(e.target.value)})} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                  </div>
                  <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                    Add Product
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

