import { PostsService } from "../services/posts.service.js";

export class PostsController {
  // 1. Get all posts
  static async getAllPosts(req, res, next) {
    try {
      console.log("user send from auth middleware", req.user);

      const posts = await PostsService.getAllPosts();

      return res.json(posts);
    } catch (error) {
      return next(error);
    }
  }
  // 2. Add a post
  static async createPost(req, res, next) {
    try {
      const postData = req.body;
      const user = req.user;

      const createdPost = await PostsService.createPost(user, postData);

      return res.status(201).send(createdPost);
    } catch (error) {
      return next(error);
    }
  }
  // 3. Get post by id
  static async getPostById(req, res, next) {
    try {
      const postId = req.params.id;

      const foundPost = await PostsService.getPostById(postId);

      return res.json(foundPost);
    } catch (error) {
      return next(error);
    }
  }
  // 4. Update a post
  static async updatePost(req, res, next) {
    try {
      const postId = req.params.id;
      const updateData = req.body;
      const user = req.user;

      await PostsService.updatePost(user, postId, updateData);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }
  // 5. Delete a post
  static async deletePost(req, res, next) {
    try {
      await PostsService.deletePost(req.user, req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  }
  // 6. Like a post
  static async likePost(req, res, next) {
    try {
      const postId = req.params.id;

      const likeCount = await PostsService.likePost(postId);

      return res.status(200).json(likeCount);
    } catch (error) {
      return next(error);
    }
  }
  // 7. Dislike a post
  static async dislikePost(req, res, next) {
    try {
      const postId = req.params.id;

      const dislikeCount = await PostsService.dislikePost(postId);

      return res.status(200).json(dislikeCount);
    } catch (error) {
      return next(error);
    }
  }
}
