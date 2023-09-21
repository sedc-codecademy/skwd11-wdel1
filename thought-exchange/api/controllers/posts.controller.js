import { PostsService } from "../services/posts.service.js";

export class PostsController {
  // 1. Get all posts
  static async getAllPosts(req, res) {
    try {
      const posts = await PostsService.getAllPosts();

      return res.json(posts);
    } catch (error) {
      return res.status(500).send({ msg: error });
    }
  }
  // 2. Add a post
  static async createPost(req, res) {
    try {
      const postData = req.body;

      const createdPost = await PostsService.createPost(postData);

      return res.status(201).send(createdPost);
    } catch (error) {
      return res.status(400).send({ msg: error });
    }
  }
  // 3. Get post by id
  static async getPostById(req, res) {
    try {
      const postId = req.params.id;

      const foundPost = await PostsService.getPostById(postId);

      return res.json(foundPost);
    } catch (error) {
      return res.status(404).send({ msg: error });
    }
  }
  // 4. Update a post
  // 5. Delete a post
  // 6. Like a post
  // 7. Dislike a post
}
