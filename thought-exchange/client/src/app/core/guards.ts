import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const authGuard = (
  authService = inject(AuthService),
  router = inject(Router)
) => {
  if (!authService.currentUser$.value) {
    router.navigate(['login']);
    return false;
  }

  return true;
};

export const loginGuard = (
  authService = inject(AuthService),
  router = inject(Router)
) => {
  if (authService.currentUser$.value) {
    router.navigate(['posts']);
    return false;
  }

  return true;
};
