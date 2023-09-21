import { Post } from "../models/post.model.js";

export class PostsService {
  // 1. Get all posts
  static async getAllPosts() {
    const posts = await Post.find({});

    return posts;
  }
  // 2. Add a post
  static async createPost(postData) {
    const { title, body, author } = postData;

    const post = new Post({ title, body, author });

    // .save() tries to save the newly created document in the database and validates it
    const createdPost = await post.save();

    return createdPost;
  }
  // 3. Get post by id
  static async getPostById(postId) {
    const foundPost = await Post.findById(postId).populate(
      "author",
      "username email"
    );

    if (!foundPost) throw new Error("Post Not Found");

    return foundPost;
  }
  // 4. Update a post
  static async updatePost(postId, updateData) {
    const post = await this.getPostById(postId);

    Object.assign(post, updateData);

    await post.save();
  }
  // 5. Delete a post
  static async deletePost(postId) {
    const response = await Post.findOneAndDelete({
      _id: postId,
    });

    console.log(response);

    if (!response) throw "Post not found";
  }
  // 6. Like a post
  // 7. Dislike a post
}
