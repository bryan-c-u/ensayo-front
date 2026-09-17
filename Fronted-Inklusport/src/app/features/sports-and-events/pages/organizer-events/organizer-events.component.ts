import { Component, OnInit } from '@angular/core';

import { AuthStateService } from '../../../../core/services/auth-state.service';
import { SportsAndEventsService } from '../../services/sports-and-events.service';
import { EventResponse } from '../../models/event-models';

/**
 * M03 - Mis eventos (organizador). Lista los eventos creados por el organizador
 * autenticado (ink-ms-sports, filtrados por `createdBy`).
 */
@Component({
  selector: 'app-organizer-events',
  templateUrl: './organizer-events.component.html',
  styleUrl: './organizer-events.component.scss',
})
export class OrganizerEventsComponent implements OnInit {
  eventos: EventResponse[] = [];
  cargando = true;
  error: string | null = null;

  constructor(
    private readonly sports: SportsAndEventsService,
    private readonly authState: AuthStateService,
  ) {}

  ngOnInit(): void {
    const email = this.authState.email();
    if (!email) {
      this.error = 'Sesión no válida. Vuelve a iniciar sesión.';
      this.cargando = false;
      return;
    }
    this.sports.getMisEventos(email).subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los eventos. Verifica que ink-ms-sports esté arriba.';
        this.cargando = false;
      },
    });
  }

  get total(): number {
    return this.eventos.length;
  }
  get activos(): number {
    return this.eventos.filter((e) => e.status === 'active').length;
  }
  get proximos(): number {
    const hoy = new Date().toISOString().slice(0, 10);
    return this.eventos.filter((e) => e.eventDate >= hoy && e.status !== 'cancelled').length;
  }
  get completos(): number {
    return this.eventos.filter((e) => e.availableCapacity === 0).length;
  }

  inscritos(e: EventResponse): number {
    return e.maxCapacity - e.availableCapacity;
  }
  ocupacion(e: EventResponse): number {
    return e.maxCapacity ? Math.round((this.inscritos(e) / e.maxCapacity) * 100) : 0;
  }
  estadoLabel(status: string): string {
    return { draft: 'Borrador', active: 'Activo', cancelled: 'Cancelado', finished: 'Finalizado' }[status] ?? status;
  }
}
