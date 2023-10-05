import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // 1. Guarding against login and register routes
    if (request.url.includes('login') || request.url.includes('register')) {
      return next.handle(request);
    }

    // 2. Checking if user is logged in
    const user = this.authService.currentUser$.value;

    if (!user) return next.handle(request);

    // 3. Cloning request with new header
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    return next.handle(clonedRequest);
  }
}
