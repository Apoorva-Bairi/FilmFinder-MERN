import mongoose from 'mongoose';

export async function connectDB() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing. Create backend/.env from .env.example and add your MongoDB Atlas connection string.');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}
