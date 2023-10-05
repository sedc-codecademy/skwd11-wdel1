export interface User {
  _id: string;
  username: string;
  email: string;
  posts: string[];
  comments: string[];
  token: string;
  refreshToken: string;
}

export interface RegisterUserReq {
  username: string;
  password: string;
  email: string;
}
