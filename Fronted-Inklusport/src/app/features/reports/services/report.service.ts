import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

/** GET /api/reportes/financiero (ReporteFinancieroResponse de ink-ms-suscripciones). */
export interface ReporteEventoItem {
  eventoId: string;
  numeroInscritos: number;
  montoTotal: number;
  comisionEstimada: number;
}
export interface ReporteFinanciero {
  desde: string;
  hasta: string;
  ingresosPorEventos: number;
  ingresosPorSuscripciones: number;
  numeroInscritos: number;
  detallePorEvento: ReporteEventoItem[];
}

/**
 * M06 - Reportes y Analítica.
 * - Reporte financiero del organizador: lo sirve ink-ms-suscripciones (RF64).
 * - Exportación CSV: en cliente. El PDF queda como punto de integración.
 */
@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly base = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  /** Reporte financiero de los eventos pago del organizador autenticado. */
  getReporteFinancieroOrganizador(): Observable<ReporteFinanciero> {
    return this.http.get<ReporteFinanciero>(`${this.base}/api/reportes/financiero`);
  }

  /** Descarga un CSV a partir de filas homogéneas (array de objetos planos). */
  exportCsv(rows: Array<Record<string, unknown>>, filename = 'reporte.csv'): void {
    if (!rows.length) {
      return;
    }
    const headers = Object.keys(rows[0]);
    const escape = (value: unknown): string => {
      const text = value === null || value === undefined ? '' : `${value}`;
      return /[",\n;]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
    };
    const csv = [
      headers.join(';'),
      ...rows.map(row => headers.map(h => escape(row[h])).join(';')),
    ].join('\r\n');

    this.download(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' }), filename);
  }

  /** Punto de integración: el backend de reportes deberá devolver el PDF. */
  exportPdf(_reportId: string, _params: Record<string, string> = {}): void {
    console.warn('[ReportService] exportPdf pendiente de integración con el backend de reportes.');
  }

  private download(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
