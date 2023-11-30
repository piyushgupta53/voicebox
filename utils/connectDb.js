import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log(`MongoDB is already connected`);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log(`MongoDB connected!!!`);
  } catch (error) {
    console.log(`MongoDB failed to connect:`, error);
  }
};
