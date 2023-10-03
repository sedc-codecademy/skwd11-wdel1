import { Injectable } from '@angular/core';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts: Post[] = [
    {
      _id: '65159fb57d1f7505aa4a324e',
      title: 'My Second Post',
      body: 'Lorem ipsum sin dolor.',
      likes: 0,
      dislikes: 0,
      author: {
        _id: '65159f287d1f7505aa4a323c',
        username: 'firstuser',
      },
      comments: [],
      createdAt: '2023-09-28T15:45:57.867Z',
      updatedAt: '2023-09-28T15:45:57.867Z',
      __v: 0,
    },
    {
      _id: '65159f7e7d1f7505aa4a3244',
      title: 'My First Post',
      body: 'Lorem ipsum sin dolor.',
      likes: 0,
      dislikes: 0,
      author: {
        _id: '65159f287d1f7505aa4a323c',
        username: 'firstuser',
      },
      comments: [
        '65159fda7d1f7505aa4a3257',
        '65159fe07d1f7505aa4a3261',
        '65159fe77d1f7505aa4a326b',
      ],
      createdAt: '2023-09-28T15:45:02.092Z',
      updatedAt: '2023-09-28T15:46:47.597Z',
      __v: 3,
    },
  ];

  getPosts() {
    return this.posts;
  }
}
