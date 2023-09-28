import { CommentsService } from "../services/comments.service.js";

export class CommentsController {
  static async getAllComments(req, res, next) {
    try {
      const comments = await CommentsService.getAllComments();

      res.status(200).send(comments);
    } catch (error) {
      next(error);
    }
  }

  static async createComment(req, res, next) {
    try {
      const commentData = req.body;
      const user = req.user;

      const createdComment = await CommentsService.createComment(
        user,
        commentData
      );

      return res.status(201).send({
        message: "Comment Added Successfully",
        comment: createdComment,
      });
    } catch (error) {
      next(error);
    }
  }
}
