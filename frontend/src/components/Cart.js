// frontend/src/components/Cart.js
import React from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const Cart = ({ cartItems, removeFromCart }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}> {/* Use unique id as key */}
              <ListItemText primary={item.name} secondary={`Price: $${item.price}`} />
              <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)}>
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Cart;