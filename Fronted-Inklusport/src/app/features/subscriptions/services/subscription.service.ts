import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import {
  CrearSuscripcionRequest,
  PagoCheckoutResponse,
  PagoEstadoResponse,
  PagoTarjetaRequest,
  Plan,
  SuscripcionResponse,
} from '../models/subscription-models';

/**
 * M09 - Suscripciones y monetización. Habla con ink-ms-suscripciones a través del
 * gateway (`/api/planes`, `/api/suscripciones`, `/api/pagos`). El JWT lo añade
 * `authInterceptor`; aquí no se manipulan cabeceras.
 */
@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  private readonly base = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  /** RF56 - planes activos (usuario / organizador). */
  getPlanes(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.base}/api/planes`);
  }

  /** RF61 - suscripción vigente del organizador autenticado (404 si aún no tiene). */
  getSuscripcionActual(): Observable<SuscripcionResponse> {
    return this.http.get<SuscripcionResponse>(`${this.base}/api/suscripciones/actual`);
  }

  /** RF58 - crea la solicitud de suscripción y devuelve el checkout de Mercado Pago. */
  crearSuscripcion(body: CrearSuscripcionRequest): Observable<PagoCheckoutResponse> {
    return this.http.post<PagoCheckoutResponse>(`${this.base}/api/suscripciones`, body);
  }

  /** RF63 - renovación o cambio de plan de una suscripción existente. */
  renovarSuscripcion(suscripcionId: number, planId?: number): Observable<PagoCheckoutResponse> {
    return this.http.post<PagoCheckoutResponse>(
      `${this.base}/api/suscripciones/${suscripcionId}/renovar`,
      planId != null ? { planId } : {},
    );
  }

  /** RF57 - inscripción pagada a un evento. */
  inscribirseEvento(eventoId: string): Observable<PagoCheckoutResponse> {
    return this.http.post<PagoCheckoutResponse>(
      `${this.base}/api/pagos/eventos/${encodeURIComponent(eventoId)}/inscripcion`,
      {},
    );
  }

  /**
   * RF70 - estado del cobro al volver del checkout. Si se pasa `paymentId` (viene en
   * los query params de la back_url) y el pago sigue PENDIENTE, el backend fuerza la
   * consulta contra Mercado Pago en lugar de esperar al webhook.
   */
  consultarEstadoPago(referencia: string, paymentId?: string | null): Observable<PagoEstadoResponse> {
    let params = new HttpParams();
    if (paymentId) {
      params = params.set('paymentId', paymentId);
    }
    return this.http.get<PagoEstadoResponse>(
      `${this.base}/api/pagos/${encodeURIComponent(referencia)}/estado`,
      { params },
    );
  }

  /**
   * RF70 - checkout propio (sin la interfaz de Mercado Pago): cobra un pago PENDIENTE
   * con el token de tarjeta que generó el SDK JS en el navegador.
   */
  pagarConTarjeta(referencia: string, datos: PagoTarjetaRequest): Observable<PagoEstadoResponse> {
    return this.http.post<PagoEstadoResponse>(
      `${this.base}/api/pagos/${encodeURIComponent(referencia)}/pagar-tarjeta`,
      datos,
    );
  }

  /**
   * Redirige el navegador al checkout de Mercado Pago.
   * @returns `false` si la respuesta no traía `checkoutUrl` (plan gratuito ya activado);
   *          en ese caso el llamador decide qué mostrar.
   */
  redirigirACheckout(resp: PagoCheckoutResponse): boolean {
    if (resp.checkoutUrl) {
      window.location.href = resp.checkoutUrl;
      return true;
    }
    return false;
  }
}
