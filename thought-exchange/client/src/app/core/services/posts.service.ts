import { Injectable, inject } from '@angular/core';
import { Post, PostDetails } from '../models/post.model';
import { BehaviorSubject } from 'rxjs';
import { PostsApiService } from './api/posts-api.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsApiService = inject(PostsApiService);

  posts$ = new BehaviorSubject<Post[]>(null);
  postDetails$ = new BehaviorSubject<PostDetails>(null);

  getPosts() {
    this.postsApiService.fetchPosts().subscribe({
      next: (value) => {
        this.posts$.next(value);
      },
      error: (err) => console.log(err),
    });
  }

  getPostDetails(postId: string) {
    this.postDetails$.next(null);
    this.postsApiService.fetchPostById(postId).subscribe({
      next: (value) => {
        this.postDetails$.next(value);
      },
      error: (err) => console.log(err),
    });
  }

  getUserPosts() {}
}
