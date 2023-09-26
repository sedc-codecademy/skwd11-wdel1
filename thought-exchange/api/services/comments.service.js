import { Comment } from "../models/comment.model.js";
import { PostsService } from "./posts.service.js";

export class CommentsService {
  // 1. Get all comments
  static async getAllComments() {
    const comments = await Comment.find({});

    return comments;
  }

  // 2. Create Comment
  static async createComment(user, commentData) {
    const post = await PostsService.getPostById(commentData.post);

    const comment = new Comment({ ...commentData, author: user._id });

    const createdComment = await comment.save();

    post.comments.push(createdComment._id);

    user.comments.push(createdComment._id);

    await post.save();

    await user.save();

    return createdComment;
  }
}
