import { FastifyInstance } from "fastify";
import * as controller from "./post.controller";
import { authGuard } from "../../middleware/authGuard";

// Define routes for post-related operations: get all posts, get post by ID, create post, update post, delete post
export async function postRoutes(app: FastifyInstance) {
  // GET /posts to retrieve all posts
  app.get("/", async (_req, reply) => {
    const posts = await controller.getPosts();
    reply.send(posts);
  });

  // GET /posts/:id to retrieve a single post by ID
  app.get("/:id", async (req, reply) => {
    const post = await controller.getPost((req.params as any).id);
    reply.send(post);
  });

  // POST /posts to create a new post (protected route)
  app.post("/", { preHandler: authGuard }, async (req, reply) => {
    const post = await controller.createPost(req.body);
    reply.code(201).send(post);
  });

  // PUT /posts/:id to update an existing post by ID (protected route)
  app.put("/:id", { preHandler: authGuard }, async (req, reply) => {
    const updatedPost = await controller.updatePost(
      (req.params as any).id,
      req.body
    );
    reply.send(updatedPost);
  });

  // DELETE /posts/:id to delete a post by ID (protected route)
  app.delete("/:id", { preHandler: authGuard }, async (req, reply) => {
    await controller.deletePost((req.params as any).id);
    reply.code(204).send();
  });
}
