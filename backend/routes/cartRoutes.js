import express from 'express';
import { getCart, addToCart } from '../controllers/cartController.js';

const router = express.Router();

// Route to fetch the cart
router.get('/', getCart);

// Fix: Use the body to send productId, not a URL parameter
router.post('/', addToCart);  // POST route should not have ':productId'

export default router;
