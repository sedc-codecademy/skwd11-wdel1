import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { PostsService } from 'src/app/core/services/posts.service';
import { Post } from 'src/app/core/models/post.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [CommonModule, PostComponent],
})
export class PostListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postsService = inject(PostsService);
  private authService = inject(AuthService);

  currentUser: User = null;

  posts$ = this.postsService.posts$;

  ngOnInit() {
    if (this.route.snapshot.routeConfig.path === 'posts/user') {
      this.currentUser = this.authService.currentUser$.value;
    }

    if (this.currentUser) {
      // this.posts = this.postsService.getUserPosts();
    } else {
      this.postsService.getPosts();
    }
  }
}
