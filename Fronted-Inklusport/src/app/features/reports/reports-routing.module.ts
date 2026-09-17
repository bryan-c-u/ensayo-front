import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { roleGuard } from '../../core/guards/role.guard';
import { AnalyticsDashboardComponent } from './pages/analytics-dashboard/analytics-dashboard.component';
import { TrainerAnalysisComponent } from './pages/trainer-analysis/trainer-analysis.component';
import { OrganizerAnalysisComponent } from './pages/organizer-analysis/organizer-analysis.component';

const routes: Routes = [
  { path: '', component: AnalyticsDashboardComponent, canActivate: [roleGuard], data: { roles: ['ADMIN'] } },
  { path: 'trainer', component: TrainerAnalysisComponent, canActivate: [roleGuard], data: { roles: ['ENTRENADOR'] } },
  { path: 'organizer', component: OrganizerAnalysisComponent, canActivate: [roleGuard], data: { roles: ['ORGANIZADOR'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
