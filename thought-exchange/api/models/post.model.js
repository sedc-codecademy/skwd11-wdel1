import mongoose from "mongoose";

// {
//     title: string;
//     body: string;
//     likes: number;
//     dislikes: number;
//     author: userId;
//     comments: commentId[];
// }

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  body: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 240,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Post = mongoose.model("Post", postSchema);
