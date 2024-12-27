import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({ cartItems, setCartItems, darkMode }) => {
  const handleIncrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const total = calculateTotal();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card elevation={3}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'path/to/placeholder-image.jpg'; // Ensure this path is correct
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                      <IconButton onClick={() => handleDecrement(item._id)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" style={{ margin: '0 10px' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton onClick={() => handleIncrement(item._id)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemove(item._id)}
                      style={{ marginTop: '10px' }}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
      <Paper
        elevation={3}
        style={{
          padding: '20px',
          marginTop: '20px',
          backgroundColor: darkMode ? '#424242' : '#f5f5f5', // Dark mode background
          color: darkMode ? '#ffffff' : '#000000', // Text color for dark mode
        }}
      >
        <Typography variant="h5" style={{ fontWeight: 'bold', textAlign: 'center' }}>
          Total: ${total}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default Cart;
