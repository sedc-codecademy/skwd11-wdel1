import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../../constants/core.constants';
import { map } from 'rxjs';
import { Post, PostDetails } from '../../models/post.model';

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
}
