import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { PostsService } from 'src/app/core/posts.service';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [CommonModule, PostComponent],
})
export class PostListComponent implements OnInit {
  posts: Post[];

  private postsService = inject(PostsService);

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    console.log('Ng on init called');
  }
}
