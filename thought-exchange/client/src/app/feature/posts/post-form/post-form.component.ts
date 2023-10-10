import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostsService } from 'src/app/core/services/posts.service';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  private postsService = inject(PostsService);
  private location = inject(Location);

  postForm: FormGroup;

  editPostData = window.history.state as Post;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.editPostData?.title ?? '', [
        Validators.required,
        Validators.minLength(6),
      ]),
      body: new FormControl(this.editPostData?.body ?? '', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(240),
      ]),
    });
  }

  onFormSubmit() {
    const { title, body } = this.postForm.value;

    console.log(title, body);

    if (this.editPostData._id) {
      this.postsService.updatePost(this.editPostData._id, title, body);
    } else {
      this.postsService.createPost(title, body);
    }
  }

  goBack() {
    this.location.back();
  }
}
