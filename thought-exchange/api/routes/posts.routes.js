import { Router } from "express";
import { PostsController } from "../controllers/posts.controller.js";
import {
  entityValidator,
  postSchema,
  updatePostSchema,
} from "../middlewares/entity-validator.middleware.js";

export const postsRouter = Router();

// 1. Get all posts - `GET /posts `
postsRouter.get("/", PostsController.getAllPosts);
// 2. Add a post - `POST /posts`
postsRouter.post("/", entityValidator(postSchema), PostsController.createPost);
// 3. Get post by id - `GET /posts/:postId`
postsRouter.get("/:id", PostsController.getPostById);
// 4. Update a post - `PATCH /posts/:postId`
postsRouter.patch(
  "/:id",
  entityValidator(updatePostSchema),
  PostsController.updatePost
);
// 5. Delete a post - `DELETE /posts/:postId`
postsRouter.delete("/:id", PostsController.deletePost);
// 6. Like a post - `PATCH /posts/:postId/like`
postsRouter.patch("/:id/like", PostsController.likePost);
// 7. Dislike a post `PATCH /posts/:postId/dislike`
postsRouter.patch("/:id/dislike", PostsController.dislikePost);
