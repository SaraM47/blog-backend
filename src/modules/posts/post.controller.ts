import { Post } from "./post.model";

// Controllers for post-related operations
// Get all posts
export const getPosts = async () => Post.find();

// Get a single post by ID
export const getPost = async (id: string) => Post.findById(id);

// Create a new post with the provided data
export const createPost = async (data: any) => Post.create(data);

// Update an existing post by ID with the provided data, returning the updated post
export const updatePost = async (id: string, data: any) =>
  Post.findByIdAndUpdate(id, data, { new: true });

// Delete a post by ID
export const deletePost = async (id: string) => Post.findByIdAndDelete(id);
