import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import Joi from 'joi';

// Define the Joi schema for cart validation
const cartSchema = Joi.object({
  productId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
});

// Get the cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('products.productId');
    if (!cart) return res.json({ products: [], total: 0 });
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Add/update product in the cart
export const addToCart = async (req, res) => {
  // Validate the request body
  const { error } = cartSchema.validate({ productId: req.body.productId });
  if (error) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const { productId } = req.body;  // Now we get productId from the body
  try {
    // Find or create a new cart
    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ products: [], total: 0 });

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Check if the product is already in the cart and update it
    const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (itemIndex >= 0) {
      // If product exists, increment the quantity
      cart.products[itemIndex].quantity += 1;
    } else {
      // If product doesn't exist, add it to the cart
      cart.products.push({ productId, quantity: 1 });
    }

    // Update the total price
    cart.total += product.price;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error('Error updating cart:', error.message);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};
