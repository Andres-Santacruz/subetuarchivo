import mongoose from 'mongoose';

export const dbConnect = async ()=>{
  const MONGO_URI = process.env.MONGO_DB || '';
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error(error);
  }
}
