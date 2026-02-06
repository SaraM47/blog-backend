import { FastifyInstance } from "fastify";
import cookie from "@fastify/cookie";

// Function to register cookie plugin in Fastify 
export async function cookiePlugin(app: FastifyInstance) {
  app.register(cookie);
}
