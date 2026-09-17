import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AuthStateService } from '../../../../core/services/auth-state.service';
import { SportsAndEventsService } from '../../../sports-and-events/services/sports-and-events.service';
import { EventResponse } from '../../../sports-and-events/models/event-models';
import { ReportService, ReporteFinanciero } from '../../services/report.service';

interface DeporteBar {
  sport: string;
  eventos: number;
  inscritos: number;
}

/**
 * M06 - Análisis del organizador. Datos reales: eventos y ocupación de ink-ms-sports
 * + reporte financiero de ink-ms-suscripciones (ingresos por eventos pago).
 */
@Component({
  selector: 'app-organizer-analysis',
  templateUrl: './organizer-analysis.component.html',
  styleUrl: './organizer-analysis.component.scss',
})
export class OrganizerAnalysisComponent implements OnInit {
  cargando = true;
  error: string | null = null;

  eventos: EventResponse[] = [];
  financiero: ReporteFinanciero | null = null;
  totalInscritos = 0;
  totalAsistieron = 0;

  constructor(
    private readonly sports: SportsAndEventsService,
    private readonly reports: ReportService,
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
      atletas: this.sports.getAtletasDeMisEventos(email),
      financiero: this.reports.getReporteFinancieroOrganizador(),
    }).subscribe({
      next: ({ eventos, atletas, financiero }) => {
        this.eventos = eventos;
        this.financiero = financiero;
        this.totalInscritos = atletas.length;
        this.totalAsistieron = atletas.filter((a) => a.asistio).length;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el análisis. Verifica que ink-ms-sports y ink-ms-suscripciones estén arriba.';
        this.cargando = false;
      },
    });
  }

  get totalEventos(): number {
    return this.eventos.length;
  }
  get asistenciaPromedio(): number {
    return this.totalInscritos ? Math.round((this.totalAsistieron / this.totalInscritos) * 100) : 0;
  }
  get ocupacionPromedio(): number {
    const conCupo = this.eventos.filter((e) => e.maxCapacity > 0);
    if (!conCupo.length) return 0;
    const s = conCupo.reduce((acc, e) => acc + (e.maxCapacity - e.availableCapacity) / e.maxCapacity, 0);
    return Math.round((s / conCupo.length) * 100);
  }
  get ingresosEventos(): number {
    return this.financiero?.ingresosPorEventos ?? 0;
  }

  get porDeporte(): DeporteBar[] {
    const map = new Map<string, DeporteBar>();
    for (const e of this.eventos) {
      const row = map.get(e.sportName) ?? { sport: e.sportName, eventos: 0, inscritos: 0 };
      row.eventos += 1;
      row.inscritos += e.maxCapacity - e.availableCapacity;
      map.set(e.sportName, row);
    }
    return [...map.values()].sort((a, b) => b.inscritos - a.inscritos);
  }
  get maxInscritosDeporte(): number {
    return Math.max(1, ...this.porDeporte.map((d) => d.inscritos));
  }

  inscritos(e: EventResponse): number {
    return e.maxCapacity - e.availableCapacity;
  }
  ocupacion(e: EventResponse): number {
    return e.maxCapacity ? Math.round((this.inscritos(e) / e.maxCapacity) * 100) : 0;
  }

  exportar(): void {
    this.reports.exportCsv(
      this.eventos.map((e) => ({
        evento: e.name,
        deporte: e.sportName,
        fecha: e.eventDate,
        cupos: e.maxCapacity,
        inscritos: this.inscritos(e),
        ocupacion: `${this.ocupacion(e)}%`,
        estado: e.status,
      })),
      'ocupacion-eventos.csv',
    );
  }
}
