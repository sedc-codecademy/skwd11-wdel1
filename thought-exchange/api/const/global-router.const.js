import { Router } from "express";
import { postsRouter } from "../routes/posts.routes.js";
import { authRouter } from "../routes/auth.routes.js";
import { authValidator } from "../middlewares/auth.middleware.js";
import { commentsRouter } from "../routes/comments.routes.js";
import { usersRouter } from "../routes/users.routes.js";

export const globalRouter = Router();

globalRouter.use("/auth", authRouter);
globalRouter.use("/posts", authValidator, postsRouter);
globalRouter.use("/comments", authValidator, commentsRouter);
globalRouter.use("/user", authValidator, usersRouter);
