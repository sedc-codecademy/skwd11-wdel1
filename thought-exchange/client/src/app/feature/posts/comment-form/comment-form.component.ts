import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  private postsService = inject(PostsService);

  commentForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.commentForm = new FormGroup({
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(140),
      ]),
    });
  }

  onFormSubmit() {
    // Call service to create comment in backend
  }
}
