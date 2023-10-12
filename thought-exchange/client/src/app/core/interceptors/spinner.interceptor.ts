import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private spinnerService = inject(SpinnerService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.spinnerService.showSpinner();

    return next.handle(request).pipe(
      tap({
        error: (err) => {
          this.spinnerService.hideSpinner();
        },
        complete: () => {
          this.spinnerService.hideSpinner();
        },
      })
    );
  }
}
