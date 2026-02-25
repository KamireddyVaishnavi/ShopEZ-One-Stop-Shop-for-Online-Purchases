import React, { useState } from 'react';
import axios from 'axios';

function Checkout() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    await axios.post(
      '/api/orders',
      { shippingAddress: address, totalAmount: amount },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      }
    );
    alert('Order Placed!');
  };

  return (
    <form onSubmit={handleCheckout}>
      <h2>Checkout</h2>
      <input placeholder="Shipping Address" onChange={(e) => setAddress(e.target.value)} /><br />
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} /><br />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default Checkout;
