import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  quantity: { type: Number, required: true, min: 1 }, // Ensure quantity is a positive integer
});

const cartSchema = new mongoose.Schema({
  products: [cartItemSchema],
  total: { type: Number, required: true, default: 0 }, // Default value for total
});

export default mongoose.model('Cart', cartSchema);