import mongoose from "mongoose";
import { env } from "./env";

// Explicit DB connection function which is called from server.ts
export async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); 
  }
}
