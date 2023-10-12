import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterUserReq } from '../../models/user.model';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;

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

  refreshAccessToken(refreshToken: string) {
    console.log(refreshToken);

    return this.http.post(`${API_URL}/auth/refresh-token`, null, {
      observe: 'response',
      headers: {
        'refresh-token': refreshToken,
      },
    });
  }

  logoutUserFromServer(refreshToken: string) {
    return this.http.post(`${API_URL}/auth/logout`, null, {
      headers: {
        'refresh-token': refreshToken,
      },
    });
  }

  logoutAllFromServer() {
    return this.http.post(`${API_URL}/auth/logout-all`, null);
  }
}
