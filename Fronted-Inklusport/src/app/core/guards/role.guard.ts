import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

/**
 * Restringe una ruta a los roles listados en su `data: { roles: [...] }`.
 * Aun no esta aplicada a ninguna ruta: hoy no existe ninguna vista
 * admin/entrenador/organizador-only en el frontend. Usarla es agregar
 * `data: { roles: ['ADMIN'] }, canActivate: [roleGuard]` a la ruta.
 */
export const roleGuard: CanActivateFn = (route) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!allowedRoles || allowedRoles.some((role) => authState.hasRole(role))) {
    return true;
  }

  return router.createUrlTree(['/home']);
};
