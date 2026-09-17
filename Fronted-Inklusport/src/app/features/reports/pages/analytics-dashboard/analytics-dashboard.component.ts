import { Component } from '@angular/core';
import { BarDatum } from '../../components/bar-chart/bar-chart.component';
import { DonutSegment } from '../../components/donut-chart/donut-chart.component';
import { ExportFormat } from '../../components/export-buttons/export-buttons.component';
import { ReportService } from '../../services/report.service';

/**
 * M06 - Panel de Analítica.
 * Toma los gráficos que antes vivían embebidos como SVG en history-statistics
 * (M05) y los expone como reporte con exportación.
 */
@Component({
  selector: 'app-analytics-dashboard',
  templateUrl: './analytics-dashboard.component.html',
  styleUrl: './analytics-dashboard.component.scss'
})
export class AnalyticsDashboardComponent {
  readonly monthlyAttendance: BarDatum[] = [
    { label: 'ENE', value: 40 }, { label: 'FEB', value: 60 }, { label: 'MAR', value: 80 },
    { label: 'ABR', value: 120 }, { label: 'MAY', value: 130, highlight: 'primary' },
    { label: 'JUN', value: 100 }, { label: 'JUL', value: 110 }, { label: 'AGO', value: 90 },
    { label: 'SEP', value: 150, highlight: 'secondary' }, { label: 'OCT', value: 120 },
    { label: 'NOV', value: 100 }, { label: 'DIC', value: 80 },
  ];

  readonly disabilityDistribution: DonutSegment[] = [
    { label: 'Discapacidad Física', value: 40, color: '#c8102e' },
    { label: 'Discapacidad Visual', value: 25, color: '#2563eb' },
    { label: 'Intelectual', value: 15, color: '#0d9488' },
    { label: 'Otras', value: 20, color: '#d1d5db' },
  ];

  constructor(private readonly reports: ReportService) {}

  onExport(format: ExportFormat): void {
    if (format === 'csv') {
      this.reports.exportCsv(
        this.monthlyAttendance.map(m => ({ mes: m.label, asistencia: m.value })),
        'asistencia-mensual.csv'
      );
      return;
    }
    this.reports.exportPdf('analytics-dashboard');
  }
}
