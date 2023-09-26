import { Router } from "express";
import { postsRouter } from "../routes/posts.routes.js";
import { authRouter } from "../routes/auth.routes.js";
import { authValidator } from "../middlewares/auth.middleware.js";
import { commentsRouter } from "../routes/comments.routes.js";

export const globalRouter = Router();

globalRouter.use("/posts", authValidator, postsRouter);
globalRouter.use("/auth", authRouter);
globalRouter.use("/comments", authValidator, commentsRouter);
