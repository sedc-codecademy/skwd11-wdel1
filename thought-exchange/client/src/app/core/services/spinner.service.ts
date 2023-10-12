import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  spinner$ = new BehaviorSubject<boolean>(false);

  showSpinner() {
    this.spinner$.next(true);
  }

  hideSpinner() {
    this.spinner$.next(false);
  }
}
