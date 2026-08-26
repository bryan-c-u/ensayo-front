import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private readonly rolesSubject = new BehaviorSubject<string[]>(
    AuthStateService.decodeRoles(localStorage.getItem(TOKEN_KEY))
  );

  readonly roles$ = this.rolesSubject.asObservable();

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.rolesSubject.next(AuthStateService.decodeRoles(token));
  }

  clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.rolesSubject.next([]);
  }

  roles(): string[] {
    return this.rolesSubject.value;
  }

  hasRole(role: string): boolean {
    return this.rolesSubject.value.includes(role);
  }

  primaryRole(): string | null {
    return this.rolesSubject.value[0] ?? null;
  }

  /**
   * El login/registro solo devuelve el JWT; los roles viajan en el claim
   * "roles" de su payload, asi que se decodifican aqui en vez de pedirlos
   * en una llamada aparte.
   */
  private static decodeRoles(token: string | null): string[] {
    if (!token) {
      return [];
    }

    try {
      const payload = token.split('.')[1];
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(normalized)
          .split('')
          .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );
      const claims = JSON.parse(json);
      return Array.isArray(claims.roles) ? claims.roles : [];
    } catch {
      return [];
    }
  }
}
