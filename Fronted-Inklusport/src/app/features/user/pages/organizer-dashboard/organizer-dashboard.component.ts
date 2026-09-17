import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AuthStateService } from '../../../../core/services/auth-state.service';
import { SportsAndEventsService } from '../../../sports-and-events/services/sports-and-events.service';
import { EventResponse } from '../../../sports-and-events/models/event-models';
import { SubscriptionService } from '../../../subscriptions/services/subscription.service';
import { SuscripcionResponse } from '../../../subscriptions/models/subscription-models';

/**
 * M02 - Panel principal del organizador (rol ORGANIZADOR).
 * Datos reales: suscripción vigente (ink-ms-suscripciones) + eventos propios y
 * su ocupación (ink-ms-sports).
 */
@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrl: './organizer-dashboard.component.scss',
})
export class OrganizerDashboardComponent implements OnInit {
  cargando = true;
  error: string | null = null;

  suscripcion: SuscripcionResponse | null = null;
  eventos: EventResponse[] = [];

  constructor(
    private readonly sports: SportsAndEventsService,
    private readonly subs: SubscriptionService,
    private readonly authState: AuthStateService,
  ) {}

  ngOnInit(): void {
    const email = this.authState.email();
    if (!email) {
      this.error = 'Sesión no válida. Vuelve a iniciar sesión.';
      this.cargando = false;
      return;
    }

    forkJoin({
      eventos: this.sports.getMisEventos(email),
      suscripcion: this.subs.getSuscripcionActual(),
    }).subscribe({
      next: ({ eventos, suscripcion }) => {
        this.eventos = eventos;
        this.suscripcion = suscripcion;
        this.cargando = false;
      },
      error: (err) => {
        // 404 en /suscripciones/actual = organizador sin suscripción: no es un error duro.
        if (err?.status === 404) {
          this.sports.getMisEventos(email).subscribe({
            next: (eventos) => { this.eventos = eventos; this.cargando = false; },
            error: () => { this.error = 'No se pudieron cargar los datos del panel.'; this.cargando = false; },
          });
          return;
        }
        this.error = 'No se pudieron cargar los datos del panel. Verifica que los servicios estén arriba.';
        this.cargando = false;
      },
    });
  }

  get totalEventos(): number {
    return this.eventos.length;
  }
  get eventosActivos(): number {
    return this.eventos.filter((e) => e.status === 'active').length;
  }
  get inscritosTotales(): number {
    return this.eventos.reduce((sum, e) => sum + (e.maxCapacity - e.availableCapacity), 0);
  }
  get ocupacionPromedio(): number {
    const conCupo = this.eventos.filter((e) => e.maxCapacity > 0);
    if (!conCupo.length) return 0;
    const suma = conCupo.reduce(
      (s, e) => s + (e.maxCapacity - e.availableCapacity) / e.maxCapacity, 0,
    );
    return Math.round((suma / conCupo.length) * 100);
  }
  get proximos(): EventResponse[] {
    const hoy = new Date().toISOString().slice(0, 10);
    return [...this.eventos]
      .filter((e) => e.eventDate >= hoy && e.status !== 'cancelled')
      .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
      .slice(0, 5);
  }

  inscritos(e: EventResponse): number {
    return e.maxCapacity - e.availableCapacity;
  }
  ocupacion(e: EventResponse): number {
    return e.maxCapacity ? Math.round((this.inscritos(e) / e.maxCapacity) * 100) : 0;
  }
}
