import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { User, Package, LogOut, ChevronRight } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/fetch-orders/${user.id}`).then(res => res.json()).then(setOrders);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* User Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 text-red-600 font-bold py-2 rounded-lg border border-red-100 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Orders Section */}
        <div className="lg:col-span-3 space-y-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" /> Your Orders
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-300 text-center">
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const items = JSON.parse(order.items || '[]');
                return (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Order Placed</p>
                          <p className="text-sm font-medium">{order.orderDate}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Total</p>
                          <p className="text-sm font-medium">₹{Math.round(order.totalPrice)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Ship To</p>
                          <p className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">{order.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Order # {order.id}</p>
                        <p className={`text-sm font-bold uppercase ${order.status === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      {items.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-6 items-center py-4 first:pt-0 last:pb-0 border-b last:border-0 border-gray-50">
                          <img src={item.mainImg} alt="" className="w-20 h-20 rounded-lg object-cover" referrerPolicy="no-referrer" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                            <p className="text-sm text-gray-500">Qty: {item.quantity} • Size: {item.size || 'N/A'}</p>
                          </div>
                          <button className="text-blue-600 text-sm font-bold hover:underline flex items-center gap-1">
                            View item <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
