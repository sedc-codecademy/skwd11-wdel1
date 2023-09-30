import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  imports: [CommonModule, PostComponent],
})
export class PostListComponent {
  posts = ['First', 'Second', 'Third', 'Forth', 'Fifth'];
}
