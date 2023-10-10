import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostDetails } from 'src/app/core/models/post.model';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  private router = inject(Router);
  private postService = inject(PostsService);
  private authService = inject(AuthService);

  currentUser: User;

  @Input() post: Post | PostDetails;
  @Input() isHoverShadow = true;
  @Input() isEditAllowed = false;

  ngOnInit() {
    this.currentUser = this.authService.currentUser$.value;
  }

  onPostClick() {
    this.router.navigate(['posts', this.post._id]);
  }

  onPostLike(e: Event) {
    e.stopImmediatePropagation();

    this.postService.likePost(this.post._id);
  }

  onPostDislike(e: Event) {
    e.stopImmediatePropagation();

    console.log('on post dislike');
    this.postService.dislikePost(this.post._id);
  }

  onPostEdit(e: Event) {
    e.stopImmediatePropagation();

    const state: any = this.post;

    this.router.navigate(['posts', 'edit'], { state });
  }
}
