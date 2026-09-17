import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, interval } from 'rxjs';

import { SubscriptionService } from '../../../subscriptions/services/subscription.service';
import { EstadoPago, TipoPago } from '../../../subscriptions/models/subscription-models';

type Resultado = 'exito' | 'pendiente' | 'error';

/**
 * Página de retorno del checkout de Mercado Pago: rutas /pagos/exito, /pagos/pendiente
 * y /pagos/error (las back_urls configuradas en ink-ms-suscripciones).
 *
 * MP añade query params ?payment_id=...&status=...&external_reference=PS-...  Como el
 * webhook puede tardar unos segundos, la página hace polling a
 * GET /api/pagos/{referencia}/estado?paymentId=... hasta que el pago deja de estar
 * PENDIENTE (o se agotan los intentos).
 */
@Component({
  selector: 'app-payment-result',
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.scss',
})
export class PaymentResultComponent implements OnInit, OnDestroy {
  resultado: Resultado = 'exito';
  referencia: string | null = null;
  paymentId: string | null = null;

  estado: EstadoPago | null = null;
  tipo: TipoPago | null = null;
  consultando = false;
  intentosAgotados = false;

  private poll?: Subscription;
  private intentos = 0;
  private readonly maxIntentos = 15;
  private readonly intervaloMs = 2500;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly subscriptions: SubscriptionService,
  ) {}

  ngOnInit(): void {
    this.resultado = (this.route.snapshot.data['resultado'] as Resultado) ?? 'exito';

    const q = this.route.snapshot.queryParamMap;
    this.referencia = q.get('external_reference');
    this.paymentId = q.get('payment_id') ?? q.get('collection_id');

    // Sin referencia (el usuario entró directo) o pago ya rechazado: no hay nada que consultar.
    if (this.referencia && this.resultado !== 'error') {
      this.iniciarPolling();
    }
  }

  ngOnDestroy(): void {
    this.poll?.unsubscribe();
  }

  get volverRuta(): string {
    return this.tipo === 'EVENTO' ? '/events' : '/subscriptions/estado';
  }

  reintentar(): void {
    window.location.assign('/subscriptions/planes');
  }

  private iniciarPolling(): void {
    this.consultando = true;
    this.consultar();
    this.poll = interval(this.intervaloMs).subscribe(() => this.consultar());
  }

  private consultar(): void {
    if (!this.referencia) {
      return;
    }
    this.intentos++;
    this.subscriptions.consultarEstadoPago(this.referencia, this.paymentId).subscribe({
      next: (r) => {
        this.estado = r.estado;
        this.tipo = r.tipo;
        if (r.estado !== 'PENDIENTE') {
          this.detenerPolling();
          this.resultado = r.estado === 'APROBADO' ? 'exito' : 'error';
        } else if (this.intentos >= this.maxIntentos) {
          this.detenerPolling();
          this.intentosAgotados = true;
          this.resultado = 'pendiente';
        }
      },
      error: () => {
        if (this.intentos >= this.maxIntentos) {
          this.detenerPolling();
          this.intentosAgotados = true;
        }
      },
    });
  }

  private detenerPolling(): void {
    this.consultando = false;
    this.poll?.unsubscribe();
  }
}
