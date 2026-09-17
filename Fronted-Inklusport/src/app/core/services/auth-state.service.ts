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

  /** Correo del usuario autenticado (claim `sub` del JWT), o null si no hay sesión. */
  email(): string | null {
    return AuthStateService.decodeClaim(localStorage.getItem(TOKEN_KEY), 'sub');
  }

  private static decodeClaim(token: string | null, claim: string): string | null {
    const payload = AuthStateService.decodePayload(token);
    const value = payload?.[claim];
    return typeof value === 'string' ? value : null;
  }

  /**
   * El login/registro solo devuelve el JWT; los roles viajan en el claim
   * "roles" de su payload, asi que se decodifican aqui en vez de pedirlos
   * en una llamada aparte.
   */
  private static decodeRoles(token: string | null): string[] {
    const claims = AuthStateService.decodePayload(token);
    return Array.isArray(claims?.['roles']) ? (claims!['roles'] as string[]) : [];
  }

  /** Decodifica el payload (segunda parte) de un JWT sin verificar la firma. */
  private static decodePayload(token: string | null): Record<string, unknown> | null {
    if (!token) {
      return null;
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
      return JSON.parse(json) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}
