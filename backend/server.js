import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import connectToDatabase from './config/db.js';
import multer from 'multer';
import path from 'path';

// Load environment variables
dotenv.config({ path: new URL('./.env', import.meta.url) });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads')); // Serve images from uploads directory

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name collisions
  },
});

const upload = multer({ storage });

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

// Endpoint to upload a product with an image
app.post('/api/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // Absolute URL path to the uploaded image

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: imagePath, // Save the absolute image path
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error uploading product:', error);
    res.status(500).json({ message: 'Error uploading product' });
  }
});

// Fetch products endpoint
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

const PORT = process.env.PORT || 4000; // Default to 4000 if not set
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error(`Failed to connect to the database: ${error.message}`);
  }
});
