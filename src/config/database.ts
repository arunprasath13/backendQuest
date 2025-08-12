// src/config/database.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env variables (make sure this is called once, at app start)
dotenv.config();

const connectDB = async () => {
  console.log("Connecting to MongoDB with URI:", process.env.MONGO_URL);

  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
