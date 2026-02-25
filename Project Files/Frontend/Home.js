import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);

  const staticProducts = [
    {
      _id: '1',
      name: 'Musk Skin Care Product',
      description: 'these are the skin care products with musk fragrance. Perfect for daily use.',
      price: 3999,
      image: 'images/img1.png',
      category: 'Skin Care'
    },
    {
      _id: '2',
      name: 'Home theatre',
      description: 'This is the sound speakers and home theatre it is supported for a big room',
      price: 5999,
      image: 'images/img2.png',
      category: 'Electronics'
    },
    {
      _id: '3',
      name: 'Alexa',
      description: 'it is a command assistant it can be used in your home',
      price: 1999,
      image: 'images/img3.png',
      category: 'Electronics'
    },
    {
      _id: '4',
      name: 'Moto Mobile Phone',
      description: 'This mobile with octa core Processor and 5000mah battery lasts upto 1 day.',
      price: 12999,
      image: 'images/img4.png',
      category: 'Electronics'
    }
  ];

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('API failed, using static data:', err);
        setProducts(staticProducts);
      });
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
    // You can integrate your cart logic here
  };

  const handleBuyNow = (product) => {
    console.log('Buying now:', product.name);
    // You can integrate your checkout logic here
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Products in SHOPEZ - One Stop for Online Purchase</h2>
      <p>Welcome to our online store! Here are some of our products:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((p) => (
          <div key={p._id} style={{
            margin: 10,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: '8px',
            maxWidth: '200px',
            textAlign: 'center',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <img
              src={p.image}
              alt={p.name}
              width="100"
              height="100"
              style={{ objectFit: 'cover', borderRadius: '4px' }}
              onError={handleImageError}
            />
            <h3 style={{ fontSize: '16px', margin: '10px 0 5px 0' }}>{p.name}</h3>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>{p.description}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff', margin: '10px 0' }}>
              ₹{p.price}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => handleAddToCart(p)}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  padding: '6px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
              <button 
                onClick={() => handleBuyNow(p)}
                style={{
                  backgroundColor: '#ffc107',
                  color: '#000',
                  padding: '6px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
