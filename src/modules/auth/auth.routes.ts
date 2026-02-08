import { FastifyInstance } from "fastify";
import { login, logout, me, register } from "./auth.controller";
import { authGuard } from "../../middleware/authGuard";

// Define routes for authentication-related operations: register, login, logout, me
export async function authRoutes(app: FastifyInstance) {
  // POST /auth/register to create a new user
  app.post("/register", register);

  // POST /auth/login to validate credentials and issue JWT
  app.post("/login", login);

  // POST /auth/logout to clear the authentication cookie
  app.post("/logout", logout);
  
  // GET /auth/me to retrieve the authenticated user's information (protected route)
  app.get("/me", { preHandler: authGuard }, me);
}
