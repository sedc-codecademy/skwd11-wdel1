export interface PostComment {
  _id: string;
  body: string;
  author: {
    _id: string;
    username: string;
  };
  post: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
