import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

/**
 * Restringe una ruta a los roles listados en su `data: { roles: [...] }`.
 * - Sin sesión → manda a `/login`.
 * - Con sesión pero sin el rol → manda a `/home`.
 * Aplicada en app-routing (`/admin`), user-routing (`/users/organizer|athletes|trainer`),
 * sports-and-events, reports y assistant.
 */
export const roleGuard: CanActivateFn = (route) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[] | undefined;
  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  const roles = authState.roles();
  if (roles.length === 0) {
    return router.createUrlTree(['/login']);
  }
  if (allowedRoles.some((role) => authState.hasRole(role))) {
    return true;
  }
  return router.createUrlTree(['/home']);
};
