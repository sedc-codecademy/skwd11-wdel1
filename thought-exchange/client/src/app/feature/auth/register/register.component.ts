import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({});
  }

  onFormSubmit() {
    console.log(this.registerForm.value);
  }
}
