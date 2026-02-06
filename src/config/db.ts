import mongoose from "mongoose";
import { env } from "./env";

// Connect to MongoDB using MONGO_URI from environment variables
mongoose.connect(env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
