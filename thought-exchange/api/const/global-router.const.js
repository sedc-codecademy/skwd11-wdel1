import { Router } from "express";
import { postsRouter } from "../routes/posts.routes.js";
import { authRouter } from "../routes/auth.routes.js";

export const globalRouter = Router();

globalRouter.use("/posts", postsRouter);
globalRouter.use("/auth", authRouter);
