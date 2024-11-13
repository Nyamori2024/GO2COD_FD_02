// ProductList.js

import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to load products.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarMessage(`${product.name} added to cart!`);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card elevation={3}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'path/to/placeholder-image.jpg'; // Fallback in case image fails to load
                  }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="h6" color="primary">${product.price.toFixed(2)}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Typography variant="body2" style={{ backgroundColor: '#1976d2', color: '#fff', padding: '10px' }}>
          {snackbarMessage}
        </Typography>
      </Snackbar>
    </div>
  );
};

export default ProductList;
