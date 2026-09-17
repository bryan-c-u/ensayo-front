import { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'auth_token';

/**
 * Adjunta el JWT (Bearer) a toda peticion dirigida al API Gateway.
 * - No pisa un header Authorization que el servicio ya haya puesto a mano
 *   (p. ej. el alta de perfil durante el registro, con un token recien emitido
 *   que todavia no esta en localStorage).
 * - Solo agrega el token a URLs de nuestro backend, nunca a terceros.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const isApiCall = req.url.startsWith(environment.apiUrl);

  if (!token || !isApiCall || req.headers.has('Authorization')) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
