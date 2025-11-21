import mongoose from 'mongoose';

const DEFAULT_URI =
  'mongodb+srv://rushi:Rushi%403006@cluster1.rsmuwwv.mongodb.net/astra?retryWrites=true&w=majority&appName=Cluster1';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || DEFAULT_URI;
    if (!uri) {
      throw new Error('Missing Mongo connection string. Set MONGO_URI.');
    }

    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error(`Mongo connection error: ${error.message}`);
    process.exit(1);
  }
};
