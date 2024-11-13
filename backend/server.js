// backend/server.js
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import connectToDatabase from './config/db.js';

dotenv.config({ path: new URL('./.env', import.meta.url) });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Middleware to disable caching for API routes
const disableCaching = (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache'); // HTTP 1.0
  res.setHeader('Expires', '0'); // Proxies
  next();
};

// Apply caching middleware to the relevant routes
app.use('/api/products', disableCaching);
app.use('/api/cart', disableCaching);

// Use the actual routes after disabling caching headers
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 4000; // Default to 5000 if not set
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(`Failed to connect to the database: ${error.message}`);
  }
});