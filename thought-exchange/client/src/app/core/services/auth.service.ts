import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  // variable for storing user data
  currentUser$ = new BehaviorSubject<string>('ivan123');

  loginUser(email: string, password: string) {
    console.log(email, password);
    this.currentUser$.next('ivan123');
    this.router.navigate(['posts']);
  }

  logoutUser() {
    this.currentUser$.next(null);
    this.router.navigate(['']);
  }
}
