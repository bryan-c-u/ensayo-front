import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SubscriptionService } from '../../services/subscription.service';
import { SuscripcionResponse } from '../../models/subscription-models';

/**
 * M09 - Estado de la suscripción del organizador autenticado (RF61) con acción de
 * renovación (RF63), que arranca un nuevo cobro en Mercado Pago sobre el mismo plan.
 */
@Component({
  selector: 'app-estado-suscripcion',
  templateUrl: './estado-suscripcion.component.html',
  styleUrl: './estado-suscripcion.component.scss',
})
export class EstadoSuscripcionComponent implements OnInit {
  suscripcion: SuscripcionResponse | null = null;
  cargando = true;
  sinSuscripcion = false;
  error: string | null = null;
  renovando = false;

  constructor(
    private readonly subscriptions: SubscriptionService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = null;
    this.subscriptions.getSuscripcionActual().subscribe({
      next: (s) => {
        this.suscripcion = s;
        this.sinSuscripcion = false;
        this.cargando = false;
      },
      error: (err) => {
        this.cargando = false;
        if (err?.status === 404) {
          this.sinSuscripcion = true;
        } else {
          this.error = 'No se pudo cargar tu suscripción.';
        }
      },
    });
  }

  renovar(): void {
    if (!this.suscripcion || this.renovando) {
      return;
    }
    this.renovando = true;
    this.error = null;
    this.subscriptions.renovarSuscripcion(this.suscripcion.id).subscribe({
      next: (resp) => {
        if (!this.subscriptions.redirigirACheckout(resp)) {
          this.renovando = false;
          this.cargar();
        }
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'No se pudo iniciar la renovación.';
        this.renovando = false;
      },
    });
  }

  irAPlanes(): void {
    this.router.navigate(['/subscriptions/planes']);
  }
}
