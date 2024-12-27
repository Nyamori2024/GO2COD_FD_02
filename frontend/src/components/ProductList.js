import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, CircularProgress, Snackbar, Alert, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const defaultImageUrl = 'path/to/default-placeholder-image.jpg';
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to load products.');
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
    setSnackbar({ open: true, message: `${product.name} added to cart!` });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '' });
  };

  const handleImageError = (e) => {
    e.target.src = defaultImageUrl; // Use the default image URL if the product image fails to load
  };

  const handleImageLoad = (id) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  // Framer Motion Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const loadingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}
            >
              <Card elevation={3}>
                {imageLoading[product._id] ? (
                  <motion.div variants={loadingVariants} initial="hidden" animate="visible">
                    <Skeleton variant="rectangular" width="100%" height={150} />
                  </motion.div>
                ) : (
                  <img
                    src={product.image || defaultImageUrl}
                    alt={product.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                    onError={handleImageError}
                    onLoad={() => handleImageLoad(product._id)}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="h6" color="primary">${product.price.toFixed(2)}</Typography>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={snackbar.open ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </motion.div>
    </div>
  );
};

export default ProductList;