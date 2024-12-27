import express from 'express';
import { getAllProducts, getProductById, createProduct, fetchAndStoreProducts } from '../controllers/productController.js';

// Your route definitions


const router = express.Router();

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Create a new product
router.post('/', createProduct);

// Route to fetch products from the fake API and store them in the database
router.post('/fetch-and-store', fetchAndStoreProducts);

export default router;
