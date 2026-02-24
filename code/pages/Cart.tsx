import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const Cart: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const { cartItems, removeFromCart } = useCart();
  const { user } = useAuth();

  if (!user) return <div className="text-center py-20">Please login to view cart</div>;

  const totalMRP = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + (item.price * item.discount / 100) * item.quantity, 0);
  const deliveryCharges = totalMRP > 0 ? 0 : 0;
  const finalPrice = totalMRP - totalDiscount + deliveryCharges;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-blue-600" /> Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <button className="text-blue-600 font-bold hover:underline">Continue Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex gap-6 shadow-sm">
                <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.mainImg} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Size: {item.size || 'N/A'} • Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-blue-600">₹{Math.round(item.price * (1 - item.discount / 100))}</span>
                    {item.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">₹{item.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Details */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider text-gray-500">Price Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total MRP</span>
                  <span className="font-medium">₹{Math.round(totalMRP)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount on MRP</span>
                  <span className="text-green-600 font-medium">-₹{Math.round(totalDiscount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between text-lg font-bold">
                  <span>Final Price</span>
                  <span className="text-blue-600">₹{Math.round(finalPrice)}</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold mt-8 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Place Order <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
