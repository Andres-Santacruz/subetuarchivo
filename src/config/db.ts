import mongoose from 'mongoose';
import { MONGO_URI } from './getVariables';

export const dbConnect = async ()=>{
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.error(error);
  }
}
