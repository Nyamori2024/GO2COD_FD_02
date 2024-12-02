import mongoose from 'mongoose';
import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import Product from '../models/Product.js'; // Adjust the path as necessary

dotenv.config({ path: new URL('./.env', import.meta.url) }); // Load environment variables

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined. Check your .env file.');
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
};

const importData = async () => {
  await connectToDatabase();

  const results = [];

  fs.createReadStream('data/products.csv') // Adjust the path if necessary
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        await Product.insertMany(results);
        console.log('Data successfully imported!');
      } catch (error) {
        console.error('Error importing data:', error);
      } finally {
        mongoose.connection.close();
      }
    });
};

importData();