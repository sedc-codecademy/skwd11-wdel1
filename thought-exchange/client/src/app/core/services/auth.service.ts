import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RegisterUserReq, User } from '../models/user.model';
import { AuthApiService } from './api/auth-api.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiService = inject(AuthApiService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  // variable for storing user data
  currentUser$ = new BehaviorSubject<User>(this.getUserFromLocalStorage());

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

        this.saveUserInLocalStorage(user);
        this.currentUser$.next(user);
        this.router.navigate(['posts']);
        this.notificationService.showSuccess('Sucessfully Logged In!');
      },
      error: (error) => {
        console.log(error);
        this.notificationService.showError(error.error.message);
      },
    });
  }

  logoutUser() {
    this.currentUser$.next(null);
    localStorage.clear();
    this.router.navigate(['']);
  }

  saveUserInLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserFromLocalStorage(): User | null {
    const stringUserData = localStorage.getItem('currentUser');

    return stringUserData ? JSON.parse(stringUserData) : null;
  }
}
