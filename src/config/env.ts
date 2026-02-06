// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Export the required environment variables
export const env = {
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN!
};