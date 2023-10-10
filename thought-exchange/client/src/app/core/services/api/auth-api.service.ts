import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from '../../constants/core.constants';
import { RegisterUserReq } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);

  loginUser(email: string, password: string) {
    return this.http.post(
      `${API_URL}/auth/login`,
      { email, password },
      {
        observe: 'response',
      }
    );
  }

  registerUser(reqBody: RegisterUserReq) {
    return this.http.post(`${API_URL}/auth/register`, reqBody);
  }
}
