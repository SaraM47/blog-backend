import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { env } from "../config/env";

// Function to register CORS plugin in Fastify
export async function corsPlugin(app: FastifyInstance) {
  app.register(cors, {
    origin: env.CLIENT_ORIGIN,
    credentials: true
  });
}
