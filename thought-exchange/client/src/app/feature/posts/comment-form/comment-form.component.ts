import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  commentForm: FormGroup;

  @Output() formOutput = new EventEmitter<string>();

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
    const { body } = this.commentForm.value;

    this.commentForm.reset();

    this.formOutput.emit(body);
  }
}
