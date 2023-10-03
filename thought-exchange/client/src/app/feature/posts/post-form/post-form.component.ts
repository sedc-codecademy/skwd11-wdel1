import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(240),
      ]),
    });
  }

  onFormSubmit() {
    const { title, body } = this.postForm.value;

    console.log(title, body);

    // Call service with data to create post in database
  }
}
