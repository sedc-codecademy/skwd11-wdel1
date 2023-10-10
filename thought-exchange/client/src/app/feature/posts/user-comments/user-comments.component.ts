import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComment } from 'src/app/core/models/comment.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
  imports: [CommonModule, CommentsListComponent],
})
export class UserCommentsComponent implements OnInit {
  private authService = inject(AuthService);
  private postsService = inject(PostsService);

  userComments$ = this.postsService.userComments$;

  currentUser: User;

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.value;
    this.postsService.getUserComments();
  }
}
