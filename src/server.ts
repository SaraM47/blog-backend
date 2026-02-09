import { app } from "./app";
import mongoose from "mongoose";
import { env } from "./config/env";

// Use PORT from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and connect to MongoDB
async function startServer() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");

    await app.listen({ port: Number(PORT), host: "0.0.0.0" });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
