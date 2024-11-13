// frontend/src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleTheme, darkMode, cartCount }) => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Online Store
        </Typography>
        <Button color="inherit" component={Link} to="/" style={{ marginRight: '10px' }}>
          Products
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartCount} color="secondary">
            Cart
          </Badge>
        </Button>
        <IconButton color="inherit" onClick={toggleTheme}>
          {darkMode ? '🌙' : '☀️'}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;