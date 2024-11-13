// frontend/src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { Grid2, Card, CardContent, Typography, Button, CircularProgress, Snackbar } from '@mui/material';
import { fetchProducts, addToCart } from '../api/api';
import { motion } from 'framer-motion';
import { Alert } from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      setSnackbarMessage('Product added to cart');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      setSnackbarMessage('Failed to add product to cart. Please try again later.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!products.length) return <Typography>No products available.</Typography>;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        Product List
      </Typography>
      <Grid2 container spacing={4}>
        {products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={product._id}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card variant="outlined" style={{ borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h5" style={{ fontWeight: 'bold' }}>{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary" style={{ marginBottom: '10px' }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" style={{ marginBottom: '10px' }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleAddToCart(product._id)}
                    style={{ borderRadius: '8px' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid2>
        ))}
      </Grid2>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ProductList;