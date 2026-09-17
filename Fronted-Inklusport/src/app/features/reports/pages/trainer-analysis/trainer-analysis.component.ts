import { Component } from '@angular/core';
import { BarDatum } from '../../components/bar-chart/bar-chart.component';
import { DonutSegment } from '../../components/donut-chart/donut-chart.component';
import { ExportFormat } from '../../components/export-buttons/export-buttons.component';
import { ReportService } from '../../services/report.service';

/**
 * M06 - Reportes y Analítica. Análisis de rendimiento de los atletas del
 * entrenador (rol ENTRENADOR). Origen: item "Análisis" del trainer-sidebar.
 */
@Component({
  selector: 'app-trainer-analysis',
  templateUrl: './trainer-analysis.component.html',
  styleUrl: './trainer-analysis.component.scss'
})
export class TrainerAnalysisComponent {
  readonly weeklyAttendance: BarDatum[] = [
    { label: 'S1', value: 8 }, { label: 'S2', value: 12 }, { label: 'S3', value: 10 },
    { label: 'S4', value: 15, highlight: 'primary' }, { label: 'S5', value: 13 },
    { label: 'S6', value: 16, highlight: 'secondary' },
  ];

  readonly disciplineSplit: DonutSegment[] = [
    { label: 'Para Natación', value: 5, color: '#dc2626' },
    { label: 'Goalball', value: 3, color: '#2563eb' },
    { label: 'Atletismo', value: 2, color: '#0d9488' },
    { label: 'Rugby en silla', value: 2, color: '#d1d5db' },
  ];

  readonly kpis = [
    { label: 'Asistencia media', value: '86%' },
    { label: 'Sesiones este mes', value: '24' },
    { label: 'Atletas activos', value: '11' },
  ];

  constructor(private readonly reports: ReportService) {}

  onExport(format: ExportFormat): void {
    if (format === 'csv') {
      this.reports.exportCsv(
        this.weeklyAttendance.map(w => ({ semana: w.label, asistencia: w.value })),
        'analisis-entrenador.csv'
      );
      return;
    }
    this.reports.exportPdf('trainer-analysis');
  }
}
