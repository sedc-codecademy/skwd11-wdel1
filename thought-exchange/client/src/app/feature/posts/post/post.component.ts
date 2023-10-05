import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post, PostDetails } from 'src/app/core/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  private router = inject(Router);

  @Input() post: Post | PostDetails;
  @Input() isHoverShadow = true;
  @Input() isEditAllowed = false;

  ngOnInit() {}

  onPostClick() {
    this.router.navigate(['posts', this.post._id]);
  }
}
