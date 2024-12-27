import fs from 'fs/promises'; // Use promises for file system operations
import path from 'path';
import csvParser from 'csv-parser';
import Product from '../models/Product.js';
import NodeCache from 'node-cache';

// Initialize cache with a default TTL of 1 hour (3600 seconds)
const productCache = new NodeCache({ stdTTL: 3600 });

// Use import.meta.url to get the current directory for ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Path to the CSV file containing product data
const csvFilePath = path.join(__dirname, '../data/products.csv');

// Fetch products from the CSV file and store them in the database
export const fetchAndStoreProducts = async (req, res) => {
  console.log('fetchAndStoreProducts function called');
  try {
    // Check if the CSV file exists
    await fs.access(csvFilePath); // Check if the file exists
    console.log('CSV file path:', csvFilePath); // Log the CSV file path

    const products = [];
    const fileStream = await fs.readFile(csvFilePath, 'utf8'); // Read the file content

    // Parse CSV data
    fileStream
      .split('\n')
      .slice(1) // Skip header
      .forEach((line) => {
        const [name, description, price, category, stock, image] = line.split(',');
        products.push({
          name,
          description,
          price: parseFloat(price),
          category,
          stock: parseInt(stock, 10),
          image,
        });
      });

    console.log('Fetched products from CSV:', products);

    // Save products to the database
    const productPromises = products.map(async (product) => {
      const newProduct = new Product(product);
      try {
        return await newProduct.save(); // Await the save operation
      } catch (err) {
        console.error('Error saving product to database:', err); // Log any save errors
        throw err; // Rethrow to handle in Promise.all
      }
    });

    // Wait for all products to be saved
    await Promise.all(productPromises);

    // Clear the cache after fetching and storing new products
    productCache.del('allProducts');

    res.status(201).json({ message: 'Products fetched and stored successfully from CSV!' });
  } catch (error) {
    console.error('Error fetching and storing products:', error);
    res.status(500).json({ message: 'Error fetching and storing products from CSV' });
  }
};

// Other controller functions (like getAllProducts, getProductById, createProduct) should also be exported correctly
export const getAllProducts = async (req, res) => {
  try {
    // Check cache first
    const cachedProducts = productCache.get('allProducts');
    if (cachedProducts) {
      return res.status(200).json(cachedProducts); // Return cached products if available
    }

    // If not in cache, fetch from the database
    const products = await Product.find();
    productCache.set('allProducts', products); // Cache the products

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching all products:', error); // Log error
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    // Check cache first
    const cachedProduct = productCache.get(`product_${req.params.id}`);
    if (cachedProduct) {
      return res.status(200).json(cachedProduct); // Return cached product if available
    }

    // If not in cache, fetch from the database
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    productCache.set(`product_${req.params.id}`, product); // Cache the product

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error); // Log error
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock, image } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    category,
    stock,
    image,
  });

  try {
    await newProduct.save();
    productCache.del('allProducts'); // Invalidate cached list of all products
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error); // Log error
    res.status(500).json({ message: 'Error creating product' });
  }
};