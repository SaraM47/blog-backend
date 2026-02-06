import Fastify from "fastify";
import { registerPlugins } from "./plugins";
import { authRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/posts/post.routes";

// Create Fastify instance
export const app = Fastify({ logger: true });

// Register plugins
registerPlugins(app);

// Register routes with prefixes
app.register(authRoutes, { prefix: "/auth" });
app.register(postRoutes, { prefix: "/posts" });
