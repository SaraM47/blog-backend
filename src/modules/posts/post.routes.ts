import { FastifyInstance } from "fastify";
import * as controller from "./post.controller";
import { authGuard } from "../../middleware/authGuard";
import mongoose from "mongoose";

// Define routes for post-related operations: get all posts, get post by ID, create post, update post, delete post
export async function postRoutes(app: FastifyInstance) {
  // GET /posts to retrieve all posts
  app.get("/", async (_req, reply) => {
    const posts = await controller.getPosts();
    reply.send(posts);
  });

  // GET /posts/:id to retrieve a single post by ID
  app.get("/:id", async (req, reply) => {
    const id = (req.params as any).id as string;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.code(400).send({ error: "Invalid post id" });
    }

    const post = await controller.getPost(id);

    if (!post) {
      return reply.code(404).send({ error: "Post not found" });
    }

    reply.send(post);
  });

  // POST /posts to create a new post (protected route)
  app.post("/", { preHandler: authGuard }, async (req, reply) => {
    const post = await controller.createPost(req.body);
    reply.code(201).send(post);
  });

  // PUT /posts/:id to update an existing post by ID (protected route)
  app.put("/:id", { preHandler: authGuard }, async (req, reply) => {
    const id = (req.params as any).id as string;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.code(400).send({ error: "Invalid post id" });
    }

    const updatedPost = await controller.updatePost(id, req.body);

    if (!updatedPost) {
      return reply.code(404).send({ error: "Post not found" });
    }

    reply.send(updatedPost);
  });

  // DELETE /posts/:id to delete a post by ID (protected route)
  app.delete("/:id", { preHandler: authGuard }, async (req, reply) => {
    const id = (req.params as any).id as string;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return reply.code(400).send({ error: "Invalid post id" });
    }

    const deletedPost = await controller.deletePost(id);

    if (!deletedPost) {
      return reply.code(404).send({ error: "Post not found" });
    }

    // Successful delete, no content returned
    reply.code(204).send();
  });
}
