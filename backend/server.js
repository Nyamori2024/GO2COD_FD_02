import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import connectToDatabase from './config/db.js';

dotenv.config({ path: new URL('./.env', import.meta.url) });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use the product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 4000; // Default to 4000 if not set
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(`Failed to connect to the database: ${error.message}`);
  }
});