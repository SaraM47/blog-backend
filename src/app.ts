import Fastify from "fastify";
import { authRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/posts/post.routes";

// Create Fastify instance
export const app = Fastify({ logger: true });

// Root endpoint (health check for Render and browser)
app.get("/", async () => {
  return { status: "API running" };
});

// Register routes with prefixes
app.register(authRoutes, { prefix: "/auth" });
app.register(postRoutes, { prefix: "/posts" });
