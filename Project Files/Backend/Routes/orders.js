const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();
const auth = require('../routes/auth');

router.post('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const order = new Order({
    userId: req.user.id,
    items: cart.items,
    totalAmount: req.body.totalAmount,
    shippingAddress: req.body.shippingAddress
  });

  await order.save();
  await Cart.deleteOne({ userId: req.user.id });

  res.json({ message: 'Order placed successfully', order });
});

module.exports = router;
