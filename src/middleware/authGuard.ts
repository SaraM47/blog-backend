import { FastifyRequest, FastifyReply } from "fastify";
import { verifyToken } from "../plugins/jwt";

// Middleware to protect routes by verifying JWT token from cookies
export async function authGuard(
  req: FastifyRequest,
  reply: FastifyReply
) {
  // Create a type assertion to access cookies
  const token = req.cookies.token;

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return reply.code(401).send({ error: "Unauthorized" });
  }

  // Verify the token and attach the decoded user information to the request object
  try {
    req.user = verifyToken(token);
  } catch {
    return reply.code(401).send({ error: "Invalid token" });
  }
}
