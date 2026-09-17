import { HttpErrorResponse } from '@angular/common/http';

/**
 * Traduce un error HTTP a un mensaje corto en español para mostrar en la UI.
 * Cubre los casos frecuentes al hablar con el gateway local.
 */
export function httpErrorMessage(err: unknown, fallback = 'Ocurrió un error inesperado.'): string {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      return 'No se pudo conectar con el servidor. ¿Está levantado el gateway en el puerto 8080?';
    }
    if (err.status === 401) {
      return 'Tu sesión expiró o no es válida. Vuelve a iniciar sesión.';
    }
    if (err.status === 403) {
      return 'No tienes permisos de administrador para esta acción.';
    }
    const apiMessage = (err.error as { message?: string } | null)?.message;
    if (apiMessage) {
      return apiMessage;
    }
  }
  return fallback;
}
