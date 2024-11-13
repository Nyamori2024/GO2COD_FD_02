// frontend/src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            E-Commerce App
          </Typography>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
