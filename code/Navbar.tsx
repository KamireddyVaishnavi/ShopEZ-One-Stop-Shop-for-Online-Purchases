import React from 'react';
import { Search, ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC<{ onPageChange: (page: string) => void }> = ({ onPageChange }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => onPageChange('home')}>
            <span className="text-2xl font-bold text-blue-600">ShopEZ</span>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Electronics, Fashion, mobiles, etc.,"
                className="w-full bg-gray-100 border-none rounded-md py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onPageChange('profile')}>
                  <UserIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.username}</span>
                </div>
                <div className="relative cursor-pointer" onClick={() => onPageChange('cart')}>
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                {user.usertype === 'admin' && (
                  <button 
                    onClick={() => onPageChange('admin')}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Admin
                  </button>
                )}
                <button onClick={logout} className="text-gray-600 hover:text-red-600">
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onPageChange('login')}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
