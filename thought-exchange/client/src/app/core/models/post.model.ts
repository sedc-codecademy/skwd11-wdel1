import { PostComment } from './comment.model';

export interface Post {
  _id: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  author: {
    _id: string;
    username: string;
  };
  comments: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostDetails {
  _id: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  comments: PostComment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
