import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JwtUserPayload } from "../types/jwt";

// Function to sign a JWT token with the given payload and secret key
export function signToken(payload: JwtUserPayload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1d" });
}

// Function to verify a JWT token and return the decoded payload
export function verifyToken(token: string): JwtUserPayload {
  const decoded = jwt.verify(token, env.JWT_SECRET);

  // Ensure the decoded payload is an object and not a string (which can happen if the token is malformed)
  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  // Return the decoded payload as a JwtUserPayload type
  return decoded as JwtUserPayload;
}
