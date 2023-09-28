import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";

export const usersRouter = Router();

// 1. Get posts by user - `GET /user/posts`
usersRouter.get("/posts", UsersController.getPostsByUser);

// 2. Get comments by user `GET /user/comments`
usersRouter.get("/comments", UsersController.getCommentsByUser);
