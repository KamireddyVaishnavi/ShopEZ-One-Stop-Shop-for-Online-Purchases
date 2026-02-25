import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    axios
      .get('/api/cart', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      })
      .then((res) => setCart(res.data));
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map((item, idx) => (
        <div key={idx}>
          <p>Product ID: {item.productId}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default Cart;