import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RegisterUserReq, User } from '../models/user.model';
import { AuthApiService } from './api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiService = inject(AuthApiService);
  private router = inject(Router);

  // variable for storing user data
  currentUser$ = new BehaviorSubject<User>(null);

  registerUser(reqBody: RegisterUserReq) {
    this.authApiService.registerUser(reqBody).subscribe({
      next: () => {
        console.log('in success register');
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  loginUser(email: string, password: string) {
    this.authApiService.loginUser(email, password).subscribe({
      next: (res) => {
        console.log(res);

        const token = res.headers.get('access-token');
        const refreshToken = res.headers.get('refresh-token');

        console.log(token, refreshToken);

        const user = res.body as User;

        user.token = token;
        user.refreshToken = refreshToken;

        console.log(user);

        this.currentUser$.next(user);
        this.router.navigate(['posts']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logoutUser() {
    this.currentUser$.next(null);
    this.router.navigate(['']);
  }
}
