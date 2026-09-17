import { Component, OnInit } from '@angular/core';

import { AuthStateService } from '../../../../core/services/auth-state.service';
import { SportsAndEventsService } from '../../../sports-and-events/services/sports-and-events.service';
import { AthleteRow } from '../../../sports-and-events/models/event-models';

/**
 * M02 - Atletas inscritos en los eventos del organizador (rol ORGANIZADOR).
 * Datos reales: para cada evento propio se piden sus inscripciones a ink-ms-sports.
 */
@Component({
  selector: 'app-organized-athletes',
  templateUrl: './organized-athletes.component.html',
  styleUrl: './organized-athletes.component.scss',
})
export class OrganizedAthletesComponent implements OnInit {
  athletes: AthleteRow[] = [];
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
    this.sports.getAtletasDeMisEventos(email).subscribe({
      next: (rows) => {
        this.athletes = rows;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los atletas. Verifica que ink-ms-sports esté arriba.';
        this.cargando = false;
      },
    });
  }

  get confirmed(): number {
    return this.athletes.filter((a) => a.estado === 'Confirmada').length;
  }
  get asistieron(): number {
    return this.athletes.filter((a) => a.asistio).length;
  }
}
