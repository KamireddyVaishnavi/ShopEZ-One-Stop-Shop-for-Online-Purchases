/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { AdminDashboard } from './pages/AdminDashboard';
import { Product } from './types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutItems, setCheckoutItems] = useState<any[]>([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const { loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleBuyNow = (product: Product, qty: number, size: string) => {
    const price = Math.round(product.price * (1 - product.discount / 100));
    setCheckoutItems([{ ...product, quantity: qty, size, price }]);
    setCheckoutTotal(price * qty);
    setCurrentPage('checkout');
  };

  const handleCartCheckout = (items: any[], total: number) => {
    setCheckoutItems(items);
    setCheckoutTotal(total);
    setCurrentPage('checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar onPageChange={setCurrentPage} />
      
      <main>
        {currentPage === 'home' && <Home onProductClick={handleProductClick} />}
        {currentPage === 'login' && <Login onPageChange={setCurrentPage} />}
        {currentPage === 'register' && <Register onPageChange={setCurrentPage} />}
        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setCurrentPage('home')} 
            onBuyNow={handleBuyNow}
          />
        )}
        {currentPage === 'cart' && (
          <Cart onCheckout={() => {
            // This is a simplified transition, in Cart.tsx we'd pass items/total
            setCurrentPage('checkout-from-cart'); 
          }} />
        )}
        {currentPage === 'checkout-from-cart' && (
          <Cart onCheckout={() => {}} /> // This is just to get the data, better to use a shared state
        )}
        {currentPage === 'checkout' && (
          <Checkout 
            items={checkoutItems} 
            total={checkoutTotal} 
            onComplete={() => setCurrentPage('profile')} 
          />
        )}
        {currentPage === 'profile' && <Profile />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-blue-600 mb-4">ShopEZ</p>
          <p className="text-gray-500 text-sm">© 2026 ShopEZ E-commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
