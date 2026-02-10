import { FastifyInstance } from "fastify";
import { cookiePlugin } from "./cookie";
import { corsPlugin } from "./cors";

// Function to register all plugins in Fastify
export async function registerPlugins(app: FastifyInstance) {
  await corsPlugin(app); // Register CORS support
  await cookiePlugin(app); // Register cookie support
}
