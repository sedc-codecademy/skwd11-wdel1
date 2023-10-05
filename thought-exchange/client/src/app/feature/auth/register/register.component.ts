import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterUserReq } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  private authService = inject(AuthService);

  registerForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      this.confirmPasswordValidator
    );
  }

  confirmPasswordValidator = (
    formGroup: any
  ): { passwordMismatch: boolean } | null => {
    // If there is an error, return object like this {error: boolean}
    if (
      formGroup.controls.password.value !==
      formGroup.controls.confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }

    // If there is no error , return null
    return null;
  };

  onFormSubmit() {
    console.log('Form group', this.registerForm);

    delete this.registerForm.value.confirmPassword;

    const reqBody: RegisterUserReq = this.registerForm.value;

    this.authService.registerUser(reqBody);
  }
}
