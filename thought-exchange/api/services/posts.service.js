import { BadRequest, GeneralError, NotFound } from "../const/error.const.js";
import { Post } from "../models/post.model.js";

export class PostsService {
  // 1. Get all posts
  static async getAllPosts() {
    try {
      const posts = await Post.find({}).populate("author", "username");

      return posts;
    } catch (error) {
      throw new GeneralError(`Couldn't fetch posts, ERROR: ${error}`);
    }
  }
  // 2. Add a post
  static async createPost(user, postData) {
    try {
      const { title, body } = postData;

      const post = new Post({ title, body, author: user._id });

      // .save() tries to save the newly created document in the database and validates it
      const createdPost = await post.save();

      user.posts.push(createdPost._id);

      await user.save();

      return createdPost;
    } catch (error) {
      throw new BadRequest(`Couldn't create post, ERROR: ${error}`);
    }
  }
  // 3. Get post by id
  static async getPostById(postId) {
    try {
      const foundPost = await Post.findById(postId)
        .populate({
          path: "author",
          select: "username email",
        })
        .populate({
          path: "comments",
          populate: {
            path: "author",
            select: "username",
          },
        });

      if (!foundPost) throw "Post Not Found";

      return foundPost;
    } catch (error) {
      throw new NotFound(`Couldn't fetch post, ERROR: ${error}`);
    }
  }
  // 4. Update a post
  static async updatePost(user, postId, updateData) {
    try {
      const post = await Post.findOne({ _id: postId, author: user._id });

      if (!post) throw "Post not found";

      Object.assign(post, updateData);

      await post.save();
    } catch (error) {
      throw new BadRequest(`Couldn't update post, ERROR: ${error}`);
    }
  }
  // 5. Delete a post
  static async deletePost(user, postId) {
    try {
      const response = await Post.findOneAndDelete({
        _id: postId,
        author: user._id,
      });

      console.log(response);

      if (!response) throw "Post not found";
    } catch (error) {
      throw new NotFound(`Post not found, ERROR: ${error}`);
    }
  }
  // 6. Like a post
  static async likePost(postId) {
    try {
      const post = await this.getPostById(postId);

      post.likes += 1;

      const updatedPost = await post.save();

      return { likes: updatedPost.likes };
    } catch (error) {
      throw new BadRequest(`Couldn't like post, ERROR: ${error}`);
    }
  }
  // 7. Dislike a post
  static async dislikePost(postId) {
    try {
      const post = await this.getPostById(postId);

      post.dislikes += 1;

      const updatedPost = await post.save();

      return { dislikes: updatedPost.dislikes };
    } catch (error) {
      throw new BadRequest(`Couldn't dislike post, ERROR: ${error}`);
    }
  }
}
