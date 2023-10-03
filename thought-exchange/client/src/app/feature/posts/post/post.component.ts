import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;

  constructor() {
    console.log('Constructor');
    console.log(this.post);
  }

  ngOnInit() {
    console.log('On Init');
    console.log(this.post);
  }
}
