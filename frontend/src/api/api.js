// frontend/src/api/api.js

// const API_BASE_URL = 'http://localhost:5000/api';  // Adjust this if using a different port or base URL

// Fetches a list of products from the backend
export async function fetchProducts() {
  try {
    const response = await fetch(`/api/products`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Adds a product to the cart
export async function addToCart(productId) {
  try {
    const response = await fetch(`/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    if (!response.ok) {
      throw new Error(`Error adding product to cart: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fetches the current user's cart
export async function fetchCart() {
  try {
    const response = await fetch(`/api/cart`);
    if (!response.ok) {
      throw new Error(`Error fetching cart: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
