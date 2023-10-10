import { NotFound } from "../const/error.const.js";

export class UsersService {
  // 1. Get posts by user
  static async getPostsByUser(user) {
    try {
      const posts = (
        await user.populate({
          path: "posts",
          populate: {
            path: "author",
            select: "username",
          },
          options: {
            sort: [{ createdAt: "desc" }],
          },
        })
      ).posts;

      return posts;
    } catch (error) {
      throw new NotFound(`Couldn't get user's posts, ERROR: ${error}`);
    }
  }

  // 2. Get comments by user
  static async getCommentsByUser(user) {
    try {
      const comments = (
        await user.populate({
          path: "comments",
          populate: {
            path: "author",
            select: "username",
          },
          options: {
            sort: [{ createdAt: "desc" }],
          },
        })
      ).comments;

      return comments;
    } catch (error) {
      throw new NotFound(`Couldn't get user's comments, ERROR: ${error}`);
    }
  }
}
