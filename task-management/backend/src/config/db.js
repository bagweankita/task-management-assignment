import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  console.log('URI exists:', Boolean(uri));
  console.log('URI starts with mongodb+srv:', uri?.startsWith('mongodb+srv://'));
  console.log('URI has placeholder:', uri?.includes('<db_password>'));

  if (!uri) throw new Error('MONGODB_URI is missing');

  await mongoose.connect(uri);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
