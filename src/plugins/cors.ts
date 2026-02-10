import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { env } from "../config/env";

// Function to register CORS plugin in Fastify
export async function corsPlugin(app: FastifyInstance) {
  app.register(cors, {
    // Use function to dynamically validate origin
    origin: (origin, cb) => {
      // Allow server-to-server requests
      if (!origin) {
        cb(null, true);
        return;
      }

      // Allow requests only from configured client origin
      if (origin === env.CLIENT_ORIGIN) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },

    // Allow cookies (JWT in HTTP-only cookie)
    credentials: true,

    // Explicitly allow all methods used by the API
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

    // Allowed headers for JSON requests
    allowedHeaders: ["Content-Type", "Authorization"]
  });
}
