import Product from '../models/Product.js'; // Adjust the path as necessary

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;
    const newProduct = new Product({ name, description, price, category, stock, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Fetch products from the fake API and store them in the database
export const fetchAndStoreProducts = async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products'); // Using Fetch API
    if (!response.ok) {
      throw new Error('Failed to fetch products from the API');
    }
    const products = await response.json(); // Parse the JSON response
    console.log('Fetched products:', products); // Log the fetched products
    const productPromises = products.map(async (product) => {
      const newProduct = new Product({
        name: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: Math.floor(Math.random() * 100), // Random stock for example
        image: product.image, // Assuming the API provides a direct image URL
      });

      return newProduct.save();
    });

    await Promise.all(productPromises);
    res.status(201).json({ message: 'Products fetched and stored successfully!' });
  } catch (error) {
    console.error('Error fetching and storing products:', error);
    res.status(500).json({ message: 'Error fetching and storing products' });
  }
};