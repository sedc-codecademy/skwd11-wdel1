import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // variable for storing user data
  currentUser$ = new BehaviorSubject<string>(null);

  loginUser(email: string, password: string) {
    console.log(email, password);
    this.currentUser$.next('ivan123');
  }

  logoutUser() {
    this.currentUser$.next(null);
  }
}
