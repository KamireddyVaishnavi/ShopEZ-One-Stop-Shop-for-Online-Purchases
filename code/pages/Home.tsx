import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Product } from '../types';
import { Star, Filter } from 'lucide-react';
import { motion } from 'motion/react';

export const Home: React.FC<{ onProductClick: (p: Product) => void }> = ({ onProductClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [banner, setBanner] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    fetch('/api/fetch-products').then(res => res.json()).then(setProducts);
    fetch('/api/fetch-admin-config').then(res => res.json()).then(data => {
      setBanner(data.bannerUrl);
      setCategories(JSON.parse(data.categories));
    });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (selectedGender !== 'all') {
      result = result.filter(p => p.gender === selectedGender || p.gender === 'Unisex');
    }

    if (sortBy === 'low-to-high') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'high-to-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'discount') result.sort((a, b) => b.discount - a.discount);

    setFilteredProducts(result);
  }, [products, selectedCategory, selectedGender, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-12 shadow-xl h-64 md:h-96">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-12">
          <div className="text-white max-w-lg">
            <h1 className="text-5xl font-bold mb-4 uppercase tracking-tighter">Super Sale</h1>
            <p className="text-xl opacity-90 mb-6">Up to 70% off on all items. Limited time offer!</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-transform hover:scale-105">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5" /> Filters
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Sort By</p>
                <div className="space-y-2">
                  {['popular', 'low-to-high', 'high-to-high', 'discount'].map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        checked={sortBy === opt}
                        onChange={() => setSortBy(opt)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm capitalize">{opt.replace(/-/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Categories</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'all'}
                      onChange={() => setSelectedCategory('all')}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">All</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Gender</p>
                <div className="space-y-2">
                  {['all', 'Men', 'Women', 'Unisex'].map(g => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === g}
                        onChange={() => setSelectedGender(g)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Products</h2>
            <p className="text-gray-500 text-sm">{filteredProducts.length} items found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={product.id}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onProductClick(product)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.mainImg}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 truncate">{product.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-[10px] text-gray-400">(15% off)</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-blue-600">₹{Math.round(product.price * (1 - product.discount / 100))}</span>
                    {product.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
