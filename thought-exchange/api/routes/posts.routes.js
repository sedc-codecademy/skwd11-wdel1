import { Router } from "express";
import { PostsController } from "../controllers/posts.controller.js";

export const postsRouter = Router();

// 1. Get all posts - `GET /posts `
postsRouter.get("/", PostsController.getAllPosts);
// 2. Add a post - `POST /posts`
postsRouter.post("/", PostsController.createPost);
// 3. Get post by id - `GET /posts/:postId`
postsRouter.get("/:id", PostsController.getPostById);
// 4. Update a post - `PATCH /posts/:postId`
// 5. Delete a post - `DELETE /posts/:postId`
// 6. Like a post - `POST /posts/:postId/like`
// 7. Dislike a post `POST /posts/:postId/dislike`
