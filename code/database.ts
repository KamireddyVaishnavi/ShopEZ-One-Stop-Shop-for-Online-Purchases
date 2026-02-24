import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('shopez.db');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    usertype TEXT DEFAULT 'customer'
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    mainImg TEXT,
    price REAL NOT NULL,
    discount REAL DEFAULT 0,
    category TEXT,
    gender TEXT,
    sizes TEXT, -- JSON array
    carousel TEXT -- JSON array
  );

  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    quantity INTEGER DEFAULT 1,
    size TEXT,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(productId) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    email TEXT,
    mobile TEXT,
    address TEXT,
    pincode TEXT,
    paymentMethod TEXT,
    orderDate TEXT,
    deliveryDate TEXT,
    status TEXT DEFAULT 'order placed',
    totalPrice REAL,
    items TEXT, -- JSON array of order items
    FOREIGN KEY(userId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS admin_config (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    bannerUrl TEXT,
    categories TEXT -- JSON array
  );

  -- Seed initial admin if not exists
  INSERT OR IGNORE INTO users (username, email, password, usertype) 
  VALUES ('admin', 'admin@shopez.com', '$2a$10$X7vH8.G.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X', 'admin');
  -- Note: The password above is a placeholder, in a real app you'd hash 'admin123'

  -- Seed initial config
  INSERT OR IGNORE INTO admin_config (id, bannerUrl, categories)
  VALUES (1, 'https://picsum.photos/seed/shopez-banner/1200/400', '["Fashion", "Electronics", "Mobiles", "Groceries", "Sports"]');

  -- Seed some products if empty
  INSERT INTO products (title, description, mainImg, price, discount, category, gender, sizes, carousel)
  SELECT 'iPhone 12', 'Apple iPhone with 64GB RAM and...', 'https://picsum.photos/seed/iphone/400/400', 67999, 15, 'Mobiles', 'Unisex', '["64GB", "128GB"]', '[]'
  WHERE NOT EXISTS (SELECT 1 FROM products);

  INSERT INTO products (title, description, mainImg, price, discount, category, gender, sizes, carousel)
  SELECT 'Realme buds', 'TWS buds with 10.2mm drivers...', 'https://picsum.photos/seed/buds/400/400', 2599, 35, 'Electronics', 'Unisex', '[]', '[]'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'Realme buds');

  INSERT INTO products (title, description, mainImg, price, discount, category, gender, sizes, carousel)
  SELECT 'MRF cricket bat', 'Popular willow wood cricket bat...', 'https://picsum.photos/seed/bat/400/400', 1308, 23, 'Sports', 'Unisex', '["Standard"]', '[]'
  WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'MRF cricket bat');
`);

export default db;
