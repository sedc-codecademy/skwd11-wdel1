import { Post } from "../models/post.model.js";

export class PostsService {
  // 1. Get all posts
  static async getAllPosts() {
    const posts = await Post.find({}).populate("author", "username");

    return posts;
  }
  // 2. Add a post
  static async createPost(user, postData) {
    const { title, body } = postData;

    const post = new Post({ title, body, author: user._id });

    // .save() tries to save the newly created document in the database and validates it
    const createdPost = await post.save();

    return createdPost;
  }
  // 3. Get post by id
  static async getPostById(postId) {
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

    if (!foundPost) throw new Error("Post Not Found");

    return foundPost;
  }
  // 4. Update a post
  static async updatePost(user, postId, updateData) {
    const post = await Post.findOne({ _id: postId, author: user._id });

    if (!post) throw new Error("Post not found");

    Object.assign(post, updateData);

    await post.save();
  }
  // 5. Delete a post
  static async deletePost(user, postId) {
    const response = await Post.findOneAndDelete({
      _id: postId,
      author: user._id,
    });

    console.log(response);

    if (!response) throw "Post not found";
  }
  // 6. Like a post
  static async likePost(postId) {
    const post = await this.getPostById(postId);

    post.likes += 1;

    const updatedPost = await post.save();

    return { likes: updatedPost.likes };
  }
  // 7. Dislike a post
  static async dislikePost(postId) {
    const post = await this.getPostById(postId);

    post.dislikes += 1;

    const updatedPost = await post.save();

    return { dislikes: updatedPost.dislikes };
  }
}
