# Thought Exchange - Platform for users to share their opinions

## Enitites

1. User

```
{
    email: string;
    password: string;
    username: string;
    comments: commentId[];
    posts: postId[]
    refreshTokens: string[]
}
```

2. Post

```
{
    title: string;
    body: string;
    likes: number;
    dislikes: number;
    author: userId;
    comments: commentId[];
}
```

3. Comment

```
{
    body: string;
    author: userId;
    post: postId;
}
```

## Endpoints

### Auth

1. Login User `POST /auth/login`
2. Register User `POST /auth/register`
3. Log out user `POST /auth/logout`
4. Refresh Token `POST /auth/refresh-token`

### Users

1. Get comments by user `GET /user/comments`
2. Get posts by user - `GET /user/posts`

### Posts

1. Get all posts - `GET /posts `
2. Get post by id - `GET /posts/:postId`
3. Add a post - `POST /posts`
4. Update a post - `PATCH /posts/:postId`
5. Delete a post - `DELETE /posts/:postId`
6. Like a post - `POST /posts/:postId/like`
7. Dislike a post `POST /posts/:postId/dislike`

### Comments

1. Create comment `POST /comments/`
2. Remove comment `DELETE /comments/:commentId`
