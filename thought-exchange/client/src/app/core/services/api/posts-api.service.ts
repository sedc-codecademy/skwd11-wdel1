import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../../constants/core.constants';
import { map } from 'rxjs';
import { Post, PostDetails } from '../../models/post.model';
import { PostComment } from '../../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class PostsApiService {
  private http = inject(HttpClient);

  fetchPosts() {
    return this.http
      .get(`${API_URL}/posts`)
      .pipe(map((value) => value as Post[]));
  }

  fetchPostById(postId: string) {
    return this.http
      .get(`${API_URL}/posts/${postId}`)
      .pipe(map((value) => value as PostDetails));
  }

  createPost(title: string, body: string) {
    return this.http
      .post(`${API_URL}/posts`, { title, body })
      .pipe(map((value) => value as Post));
  }

  createComment(body: string, post: string) {
    return this.http.post(`${API_URL}/comments`, { body, post });
  }

  likePost(postId: string) {
    return this.http
      .patch(`${API_URL}/posts/${postId}/like`, null)
      .pipe(map((value) => value as { likes: number }));
  }

  dislikePost(postId: string) {
    return this.http
      .patch(`${API_URL}/posts/${postId}/dislike`, null)
      .pipe(map((value) => value as { dislikes: number }));
  }

  fetchPostsByUser() {
    return this.http
      .get(`${API_URL}/user/posts`)
      .pipe(map((value) => value as Post[]));
  }

  fetchCommentsByUser() {
    return this.http
      .get(`${API_URL}/user/comments`)
      .pipe(map((value) => value as PostComment[]));
  }

  updatePost(postId: string, title: string, body: string) {
    return this.http.patch(`${API_URL}/posts/${postId}`, { title, body });
  }
}
