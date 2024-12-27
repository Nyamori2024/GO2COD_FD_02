import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Navbar from './components/Navbar';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id); // Ensure you're using the correct ID
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    // Update localStorage after the state has been updated
    localStorage.setItem('cart', JSON.stringify([...cartItems, { ...product, quantity: 1 }]));
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} cartCount={cartItems.length} />
        <Container maxWidth="lg" style={{ paddingTop: '64px' }}>
          <Routes>
            <Route path="/" element={<ProductList addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;