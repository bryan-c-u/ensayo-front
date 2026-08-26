import { Injectable } from '@angular/core';
import { RegisterRequest } from '../models/register-request';
import { RegisterResult } from '../models/register-result';
import { AuthResponse } from '../models/auth-response';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { ForgotPasswordRequest } from '../models/forgot-password-request';
import { ForgotPasswordResponse } from '../models/forgot-password-response';
import { UserProfileResponse } from '../models/user-profile-response';
import { UpdateProfileRequest } from '../models/update-profile-request';
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

  register(data: RegisterRequest): Observable<RegisterResult> {
    const authPayload = {
      nombre: data.fullName,
      email: data.email,
      password: data.password
    };

    return this.http.post<AuthResponse>(`${this.apiUrlAuth}/register`, authPayload).pipe(
      switchMap((registerResponse) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${registerResponse.token}`
        });

        const profilePayload = {
          fullName: data.fullName,
          phone: data.phone,
          disability: data.disabilityType,
          requestedRole: data.requestedRole
        };

        return this.http
          .post<UserProfileResponse>(`${this.apiUrlUsers}/perfil`, profilePayload, { headers })
          .pipe(
            // El registro no emite un JWT con roles (el perfil/rol aun no existia
            // en ese momento). Se vuelve a iniciar sesion para obtener un token
            // que ya refleje el rol recien asignado.
            switchMap((profileResponse) =>
              this.login({ email: data.email, password: data.password }).pipe(
                map((loginResponse): RegisterResult => ({
                  ...loginResponse,
                  pendingRoleRequest: profileResponse.pendingRoleRequest
                }))
              )
            )
          );
      })
    );
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrlAuth}/login`, data);
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(`${this.apiUrlAuth}/forgot-password`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getMyProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${this.apiUrlUsers}/perfil`, {
      headers: this.authHeaders()
    });
  }

  updateMyProfile(data: UpdateProfileRequest): Observable<UserProfileResponse> {
    return this.http.put<UserProfileResponse>(`${this.apiUrlUsers}/perfil`, data, {
      headers: this.authHeaders()
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }
}
