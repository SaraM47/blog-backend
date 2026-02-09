import mongoose from "mongoose";

// Define the Post schema with title and content fields, and enable timestamps for createdAt and updatedAt
const postSchema = new mongoose.Schema({
  title: String,
  content: String
}, { timestamps: true });

// Create and export the Post model based on the postSchema
export const Post = mongoose.model("Post", postSchema);
