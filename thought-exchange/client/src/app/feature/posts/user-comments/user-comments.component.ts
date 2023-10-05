import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComment } from 'src/app/core/models/comment.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { CommentsListComponent } from '../comments-list/comments-list.component';

@Component({
  selector: 'app-user-comments',
  standalone: true,
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.scss'],
  imports: [CommonModule, CommentsListComponent],
})
export class UserCommentsComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: User;
  comments: PostComment[] = [
    {
      _id: '65159fda7d1f7505aa4a3257',
      body: 'I made this post',
      author: {
        _id: '65159f287d1f7505aa4a323c',
        username: 'firstuser',
      },
      post: '65159f7e7d1f7505aa4a3244',
      createdAt: '2023-09-28T15:46:34.833Z',
      updatedAt: '2023-09-28T15:46:34.833Z',
      __v: 0,
    },
    {
      _id: '65159fe07d1f7505aa4a3261',
      body: "Please don't hate",
      author: {
        _id: '65159f287d1f7505aa4a323c',
        username: 'firstuser',
      },
      post: '65159f7e7d1f7505aa4a3244',
      createdAt: '2023-09-28T15:46:40.693Z',
      updatedAt: '2023-09-28T15:46:40.693Z',
      __v: 0,
    },
    {
      _id: '65159fe77d1f7505aa4a326b',
      body: 'I will block all of you',
      author: {
        _id: '65159f287d1f7505aa4a323c',
        username: 'firstuser',
      },
      post: '65159f7e7d1f7505aa4a3244',
      createdAt: '2023-09-28T15:46:47.541Z',
      updatedAt: '2023-09-28T15:46:47.541Z',
      __v: 0,
    },
  ];

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser$.value;
  }
}
