// frontend/src/App.js
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
    setCartItems((prevItems) => [...prevItems, product]);
    localStorage.setItem('cart', JSON.stringify([...cartItems, product]));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;