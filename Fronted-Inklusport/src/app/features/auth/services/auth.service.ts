import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { AuthResponse } from '../models/auth-response';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { ForgotPasswordRequest } from '../models/forgot-password-request';
import { ForgotPasswordResponse } from '../models/forgot-password-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlAuth = 'http://localhost:8080/api/auth';
  private apiUrlUsers = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest): Observable<AuthResponse> {
    const authPayload = {
      nombre: data.fullName,
      email: data.email,
      password: data.password
    };

    return this.http.post<AuthResponse>(`${this.apiUrlAuth}/register`, authPayload).pipe(
      switchMap((authResponse) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${authResponse.token}`
        });

        const profilePayload = {
          fullName: data.fullName,
          phone: data.phone,
          disability: data.disabilityType
        };

        return this.http
          .post(`${this.apiUrlUsers}/perfil`, profilePayload, { headers })
          .pipe(map(() => authResponse));
      })
    );
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrlAuth}/login`, data);
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.apiUrlAuth}/forgot-password`, data);
  }
}
