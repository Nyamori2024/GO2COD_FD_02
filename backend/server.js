import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import Product from './models/Product.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config({ path: new URL('./.env', import.meta.url) });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined. Check your .env file.');
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

// Import data from CSV
const importData = async () => {
  const results = [];
  const csvFilePath = path.resolve('backend', 'data', 'products.csv'); // Updated to include 'backend' directory

  return new Promise((resolve, reject) => {
    fs.access(csvFilePath, fs.constants.R_OK, (err) => {
      if (err) {
        console.error(`File not accessible: ${err.message}`);
        reject(err);
        return;
      }

      fs.createReadStream(csvFilePath)
        .on('error', (err) => {
          console.error('Error reading the CSV file:', err.message);
          reject(err);
        })
        .pipe(csv())
        .on('data', (data) => {
          if (data.name && data.price && data.category) {
            results.push(data); // Validate data fields before pushing
          }
        })
        .on('end', async () => {
          try {
            await Product.deleteMany({}); // Optional: Clear collection before import
            await Product.insertMany(results);
            console.log('Data successfully imported!');
            resolve();
          } catch (error) {
            console.error('Error importing data:', error);
            reject(error);
          }
        });
    });
  });
};

// Use the product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 4000; // Default to 4000 if not set
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);

    // Ensure data import happens after the database connection
    await importData();
  } catch (error) {
    console.error(`Failed to connect to the database: ${error.message}`);
  }
});

// Separate route to trigger CSV import manually
app.post('/api/import', async (req, res) => {
  try {
    await importData();
    res.status(200).send('Data imported successfully!');
  } catch (error) {
    res.status(500).send(`Error importing data: ${error.message}`);
  }
});
