// frontend/src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { fetchCart } from '../api/api';
import { List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCart() {
      try {
        const data = await fetchCart();
        setCart(data);
      } catch (error) {
        console.error('Failed to load cart:', error);
      } finally {
        setLoading(false);
      }
    }
    getCart();
  }, []);

  if (loading) return <CircularProgress />;
  if (!cart || !cart.products.length) return <Typography>No items in the cart.</Typography>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      <List>
        {cart.products.map((item) => (
          <ListItem key={item.productId._id}>
            <ListItemText
              primary={item.productId.name}
              secondary={`Quantity: ${item.quantity} - Price: $${item.productId.price}`}
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" align="right">
        Total: ${cart.total}
      </Typography>
    </motion.div>
  );
}

export default Cart;
