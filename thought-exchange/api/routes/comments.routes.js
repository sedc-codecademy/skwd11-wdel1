import { Router } from "express";
import { CommentsController } from "../controllers/comments.controller.js";
import {
  commentSchema,
  entityValidator,
} from "../middlewares/entity-validator.middleware.js";

export const commentsRouter = Router();

commentsRouter.get("/", CommentsController.getAllComments);

commentsRouter.post(
  "/",
  entityValidator(commentSchema),
  CommentsController.createComment
);
