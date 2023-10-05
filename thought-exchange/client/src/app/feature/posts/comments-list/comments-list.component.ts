import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComment } from 'src/app/core/models/comment.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comments-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent {
  @Input() comments: PostComment[];
  @Input() showPostLink = false;
}
