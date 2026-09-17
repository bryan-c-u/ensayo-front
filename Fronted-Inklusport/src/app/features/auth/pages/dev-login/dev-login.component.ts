import { Component, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../../core/services/auth-state.service';

type DevRole = 'USUARIO' | 'ENTRENADOR' | 'ORGANIZADOR' | 'ADMIN';

interface DevRoleOption {
  role: DevRole;
  label: string;
  landing: string;
}

/**
 * Login de desarrollo (SOLO en `ng serve` / builds no productivas).
 * Inyecta un JWT falso con el claim `roles` para poder probar las vistas
 * protegidas por `roleGuard` sin backend ni aprobación de admin.
 * En producción (`isDevMode() === false`) redirige a la raíz.
 */
@Component({
  selector: 'app-dev-login',
  templateUrl: './dev-login.component.html',
  styleUrl: './dev-login.component.scss'
})
export class DevLoginComponent {
  readonly isDev = isDevMode();
  readonly currentRoles = this.authState.roles();

  readonly options: DevRoleOption[] = [
    { role: 'USUARIO', label: 'Atleta (USUARIO)', landing: '/home' },
    { role: 'ENTRENADOR', label: 'Entrenador', landing: '/users/trainer' },
    { role: 'ORGANIZADOR', label: 'Organizador', landing: '/users/organizer' },
    { role: 'ADMIN', label: 'Administrador', landing: '/admin' },
  ];

  constructor(
    private readonly authState: AuthStateService,
    private readonly router: Router
  ) {}

  enterAs(option: DevRoleOption): void {
    if (!this.isDev) {
      return;
    }
    this.authState.setToken(this.fakeJwt([option.role]));
    this.router.navigateByUrl(option.landing);
  }

  logout(): void {
    this.authState.clearToken();
    this.router.navigateByUrl('/');
  }

  /** JWT sin firmar (alg: none). Solo sirve para el frontend en modo dev. */
  private fakeJwt(roles: DevRole[]): string {
    const enc = (obj: unknown): string =>
      btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    const header = enc({ alg: 'none', typ: 'JWT' });
    const payload = enc({
      sub: 'dev-user',
      nombre: `Dev ${roles[0]}`,
      email: 'dev@inklusport.local',
      roles,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    });
    return `${header}.${payload}.dev-signature`;
  }
}
