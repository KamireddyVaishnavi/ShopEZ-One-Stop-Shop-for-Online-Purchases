const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});

  const products = [
    {
      name: 'Elegant Gold Bangle',
      description: '22k gold bangle perfect for gifts.',
      price: 3999,
      image: 'client/public/images/img1.png', // Add proper path
      category: 'Fashion Accessories'
    },
    {
      name: 'Chic Handbag',
      description: 'Premium leather handbag.',
      price: 2499,
      image: 'client/public/images/img2.png', // Add proper path
      category: 'Fashion Accessories'
    },
    {
      name: 'The Body Shop White Musk',
      description: 'Scented body care set: lotion, shower gel, and fragrance mist. Vegan and premium.',
      price: 1999,
      image: 'client/public/images/img3.png', // Add proper path
      category: 'Skin Care'
    }
  ];

  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit();
}

seed();