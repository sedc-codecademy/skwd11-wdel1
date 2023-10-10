import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDetails } from 'src/app/core/models/post.model';
import { PostComponent } from '../post/post.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  imports: [
    CommonModule,
    PostComponent,
    CommentFormComponent,
    CommentsListComponent,
  ],
})
export class PostDetailsComponent implements OnInit {
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);

  postDetails$ = this.postsService.postDetails$;

  ngOnInit(): void {
    const postId = this.route.snapshot.params.id;

    // Fetch post details from backend and change value of post details
    this.postsService.getPostDetails(postId);
  }

  onCommentSubmit(body: string) {
    console.log('comment submitted in parent');
    console.log(`This is the body: ${body}`);

    this.postsService.createComment(body);
  }
}
