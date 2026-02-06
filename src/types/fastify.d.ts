import "fastify";

// Extend FastifyRequest to include 'user' property for authenticated requests
declare module "fastify" {
  interface FastifyRequest {
    user?: {
      email: string;
      iat?: number;
      exp?: number;
    };
  }
}
