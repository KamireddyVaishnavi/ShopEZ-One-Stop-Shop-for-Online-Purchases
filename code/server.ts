import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./src/database.ts";

const JWT_SECRET = "shopez_secret_key_123";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- Auth Routes ---
  app.post("/api/register", async (req, res) => {
    const { username, email, usertype, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare("INSERT INTO users (username, email, usertype, password) VALUES (?, ?, ?, ?)");
      const info = stmt.run(username, email, usertype || 'customer', hashedPassword);
      res.status(201).json({ id: info.lastInsertRowid, username, email, usertype });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(400).json({ message: "User already exists" });
      }
      res.status(500).json({ message: "Server Error" });
    }
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
      if (!user) return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      const token = jwt.sign({ id: user.id, usertype: user.usertype }, JWT_SECRET);
      res.json({ token, user: { id: user.id, username: user.username, email: user.email, usertype: user.usertype } });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

  // --- Product Routes ---
  app.get("/api/fetch-products", (req, res) => {
    try {
      const products = db.prepare("SELECT * FROM products").all();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching products" });
    }
  });

  app.post("/api/add-new-product", (req, res) => {
    const { title, description, mainImg, price, discount, category, gender, sizes, carousel } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO products (title, description, mainImg, price, discount, category, gender, sizes, carousel)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(title, description, mainImg, price, discount, category, gender, JSON.stringify(sizes), JSON.stringify(carousel));
      res.status(201).json({ message: "Product added!" });
    } catch (error) {
      res.status(500).json({ message: "Error adding product" });
    }
  });

  // --- Cart Routes ---
  app.get("/api/fetch-cart/:userId", (req, res) => {
    const { userId } = req.params;
    try {
      const cartItems = db.prepare(`
        SELECT cart.*, products.title, products.price, products.discount, products.mainImg 
        FROM cart 
        JOIN products ON cart.productId = products.id 
        WHERE cart.userId = ?
      `).all(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart" });
    }
  });

  app.post("/api/add-to-cart", (req, res) => {
    const { userId, productId, quantity, size } = req.body;
    try {
      const existing = db.prepare("SELECT * FROM cart WHERE userId = ? AND productId = ? AND size = ?").get(userId, productId, size);
      if (existing) {
        db.prepare("UPDATE cart SET quantity = quantity + ? WHERE id = ?").run(quantity || 1, (existing as any).id);
      } else {
        db.prepare("INSERT INTO cart (userId, productId, quantity, size) VALUES (?, ?, ?, ?)").run(userId, productId, quantity || 1, size);
      }
      res.json({ message: "Added to cart" });
    } catch (error) {
      res.status(500).json({ message: "Error adding to cart" });
    }
  });

  app.delete("/api/remove-from-cart/:id", (req, res) => {
    try {
      db.prepare("DELETE FROM cart WHERE id = ?").run(req.params.id);
      res.json({ message: "Removed" });
    } catch (error) {
      res.status(500).json({ message: "Error removing" });
    }
  });

  // --- Order Routes ---
  app.post("/api/place-order", (req, res) => {
    const { userId, name, email, mobile, address, pincode, paymentMethod, orderDate, deliveryDate, totalPrice, items } = req.body;
    try {
      const stmt = db.prepare(`
        INSERT INTO orders (userId, name, email, mobile, address, pincode, paymentMethod, orderDate, deliveryDate, totalPrice, items)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      stmt.run(userId, name, email, mobile, address, pincode, paymentMethod, orderDate, deliveryDate, totalPrice, JSON.stringify(items));
      
      // Clear cart
      db.prepare("DELETE FROM cart WHERE userId = ?").run(userId);
      
      res.json({ message: "Order placed!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error placing order" });
    }
  });

  app.get("/api/fetch-orders/:userId", (req, res) => {
    try {
      const orders = db.prepare("SELECT * FROM orders WHERE userId = ?").all(req.params.userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  });

  app.get("/api/fetch-all-orders", (req, res) => {
    try {
      const orders = db.prepare("SELECT * FROM orders").all();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching all orders" });
    }
  });

  app.put("/api/update-order-status/:id", (req, res) => {
    const { status } = req.body;
    try {
      db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
      res.json({ message: "Status updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating status" });
    }
  });

  // --- Admin Config ---
  app.get("/api/fetch-admin-config", (req, res) => {
    try {
      const config = db.prepare("SELECT * FROM admin_config WHERE id = 1").get();
      res.json(config);
    } catch (error) {
      res.status(500).json({ message: "Error fetching config" });
    }
  });

  app.put("/api/update-banner", (req, res) => {
    const { bannerUrl } = req.body;
    try {
      db.prepare("UPDATE admin_config SET bannerUrl = ? WHERE id = 1").run(bannerUrl);
      res.json({ message: "Banner updated" });
    } catch (error) {
      res.status(500).json({ message: "Error updating banner" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => res.sendFile("dist/index.html", { root: "." }));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
