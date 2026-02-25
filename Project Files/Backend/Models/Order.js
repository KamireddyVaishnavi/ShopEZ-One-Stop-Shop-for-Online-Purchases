const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      quantity: Number
    }
  ],
  totalAmount: Number,
  shippingAddress: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);