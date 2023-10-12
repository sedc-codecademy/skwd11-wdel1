import { Injectable, inject } from '@angular/core';
import { Post, PostDetails } from '../models/post.model';
import { BehaviorSubject } from 'rxjs';
import { PostsApiService } from './api/posts-api.service';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { PostComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private postsApiService = inject(PostsApiService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  posts$ = new BehaviorSubject<Post[]>(null);
  postDetails$ = new BehaviorSubject<PostDetails>(null);
  userComments$ = new BehaviorSubject<PostComment[]>(null);

  getPosts() {
    this.posts$.next(null);
    this.postDetails$.next(null);
    this.postsApiService.fetchPosts().subscribe({
      next: (value) => {
        this.posts$.next(value);
      },
      error: (err) => this.notificationService.showError(err.error.message),
    });
  }

  getPostDetails(postId: string, refresh = true) {
    if (refresh) this.postDetails$.next(null);
    this.postsApiService.fetchPostById(postId).subscribe({
      next: (value) => {
        this.postDetails$.next(value);
      },
      error: (err) => {
        this.notificationService.showError(err.error.message);
        this.router.navigate(['not-found']);
      },
    });
  }

  createPost(title: string, body: string) {
    this.postsApiService.createPost(title, body).subscribe({
      next: (post) => {
        this.notificationService.showSuccess('Post created successfully!');
        this.router.navigate(['posts', post._id]);
      },
      error: (err) => {
        this.notificationService.showError(err.error.message);
      },
    });
  }

  createComment(body: string) {
    this.postsApiService
      .createComment(body, this.postDetails$.value._id)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Comment added successfully!');
          this.getPostDetails(this.postDetails$.value._id, false);
        },
        error: (err) => {
          this.notificationService.showError(err.error.message);
        },
      });
  }

  likePost(postId: string) {
    this.postsApiService.likePost(postId).subscribe({
      next: (value) => {
        if (this.postDetails$.value) {
          const post = this.postDetails$.value;

          post.likes = value.likes;

          this.postDetails$.next(post);

          return;
        }

        const posts = this.posts$.value;

        posts.forEach((post) => {
          if (post._id === postId) {
            post.likes = value.likes;
            return;
          }
        });

        this.posts$.next(posts);
      },
      error: (err) => {
        this.notificationService.showError(err.error.message);
      },
    });
  }

  dislikePost(postId: string) {
    this.postsApiService.dislikePost(postId).subscribe({
      next: (value) => {
        if (this.postDetails$.value) {
          const post = this.postDetails$.value;

          post.dislikes = value.dislikes;

          this.postDetails$.next(post);

          return;
        }

        const posts = this.posts$.value;

        posts.forEach((post) => {
          if (post._id === postId) {
            post.dislikes = value.dislikes;
            return;
          }
        });

        this.posts$.next(posts);
      },
      error: (err) => {
        this.notificationService.showError(err.error.message);
      },
    });
  }

  getUserPosts() {
    this.posts$.next(null);
    this.postsApiService.fetchPostsByUser().subscribe({
      next: (posts) => {
        this.posts$.next(posts);
      },
      error: (err) => this.notificationService.showError(err.error.message),
    });
  }

  getUserComments() {
    this.userComments$.next(null);
    this.postsApiService.fetchCommentsByUser().subscribe({
      next: (comments) => {
        this.userComments$.next(comments);
      },
      error: (err) => this.notificationService.showError(err.error.message),
    });
  }

  updatePost(postId: string, title: string, body: string) {
    this.postsApiService.updatePost(postId, title, body).subscribe({
      next: () => {
        this.notificationService.showSuccess('Post updated successfully!');
        this.router.navigate(['posts', postId]);
      },
      error: (err) => this.notificationService.showError(err.error.message),
    });
  }

  deletePost(postId: string) {
    this.postsApiService.deletePost(postId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Post deleted successfully!');
        this.getUserPosts();
      },
      error: (err) => this.notificationService.showError(err.error.message),
    });
  }
}
