const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();
const auth = require('../routes/auth');

router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart || { userId: req.user.id, items: [] });
});

router.post('/add', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) {
    cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
  } else {
    const index = cart.items.findIndex(i => i.productId === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }
  await cart.save();
  res.json(cart);
});

module.exports = router;