const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();

// === Middleware ===
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const PORT = process.env.PORT || 5000;

// === Start the server ===
async function startServer() {
  try {
    // ✅ Connect to MongoDB (Mongoose v7+ syntax)
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // ✅ Mount route handlers
    app.use('/api/auth', require('./routes/auth'));         // User login/register
    app.use('/api/products', require('./routes/products')); // Product API
    app.use('/api/cart', require('./routes/cart'));         // Cart handling
    app.use('/api/orders', require('./routes/orders'));  
   app.use('/images', express.static('public/images'));  // Orders

    // ✅ Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err.message);
  }
}

startServer();
