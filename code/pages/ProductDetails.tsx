import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Star, ShoppingCart, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductDetails: React.FC<{ product: Product; onBack: () => void; onBuyNow: (p: Product, qty: number, size: string) => void }> = ({ product, onBack, onBuyNow }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImg, setCurrentImg] = useState(0);

  const sizes = JSON.parse(product.sizes || '[]');
  const carousel = JSON.parse(product.carousel || '[]');
  const images = [product.mainImg, ...carousel];

  const handleAddToCart = async () => {
    if (!user) return alert('Please login first');
    await addToCart(product.id, quantity, selectedSize);
    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="flex items-center text-gray-600 hover:text-blue-600 mb-8 font-medium">
        <ChevronLeft className="w-5 h-5" /> Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <img src={images[currentImg]} alt={product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${currentImg === i ? 'border-blue-600' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-gray-500">{product.category} • {product.gender}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-sm text-gray-500 font-medium">4.8 (124 reviews)</span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-blue-600">₹{Math.round(product.price * (1 - product.discount / 100))}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                <span className="text-lg font-bold text-red-500">{product.discount}% OFF</span>
              </>
            )}
          </div>

          <div className="border-t border-b border-gray-100 py-6 space-y-4">
            {sizes.length > 0 && (
              <div>
                <p className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Available Size</p>
                <div className="flex gap-3">
                  {sizes.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors ${selectedSize === s ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 hover:border-blue-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Quantity</p>
              <div className="flex items-center border border-gray-200 rounded-md w-max">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-gray-50">-</button>
                <span className="px-6 py-2 border-l border-r border-gray-200 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 hover:bg-gray-50">+</button>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" /> Add to cart
            </button>
            <button
              onClick={() => onBuyNow(product, quantity, selectedSize)}
              className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              <Zap className="w-5 h-5" /> Shop Now
            </button>
          </div>

          <div className="space-y-4 pt-6">
            <h3 className="font-bold text-lg">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
