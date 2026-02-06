import mongoose from "mongoose";

// Define the User schema and model for MongoDB using Mongoose
export interface UserDocument extends mongoose.Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// Create the User model with email and passwordHash fields
const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Export the User model
export const User = mongoose.model<UserDocument>("User", userSchema);
