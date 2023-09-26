import { CommentsService } from "../services/comments.service.js";

export class CommentsController {
  static async getAllComments(req, res) {
    try {
      const comments = await CommentsService.getAllComments();

      res.status(200).send(comments);
    } catch (error) {
      res.status(500).send({ msg: error });
    }
  }

  static async createComment(req, res) {
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
      res.status(400).send({ msg: error });
    }
  }
}
