import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
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
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
