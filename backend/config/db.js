import mongoose from 'mongoose';

const connectToDatabase = async () => {
  const uri = process.env.MONGO_URI
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

export default connectToDatabase;