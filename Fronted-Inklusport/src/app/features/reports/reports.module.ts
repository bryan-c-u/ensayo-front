import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { AdminFiltersModule } from '../admin-filters/admin-filters.module';
import { ReportsRoutingModule } from './reports-routing.module';

import { AnalyticsDashboardComponent } from './pages/analytics-dashboard/analytics-dashboard.component';
import { TrainerAnalysisComponent } from './pages/trainer-analysis/trainer-analysis.component';
import { OrganizerAnalysisComponent } from './pages/organizer-analysis/organizer-analysis.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DonutChartComponent } from './components/donut-chart/donut-chart.component';
import { ExportButtonsComponent } from './components/export-buttons/export-buttons.component';

/**
 * M06 - Reportes y Analítica.
 * Gráficos reutilizables, exportación (CSV/PDF) y paneles estadísticos.
 */
@NgModule({
  declarations: [
    AnalyticsDashboardComponent,
    TrainerAnalysisComponent,
    OrganizerAnalysisComponent,
    BarChartComponent,
    DonutChartComponent,
    ExportButtonsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminFiltersModule,
    ReportsRoutingModule
  ],
  exports: [
    BarChartComponent,
    DonutChartComponent,
    ExportButtonsComponent
  ]
})
export class ReportsModule { }
