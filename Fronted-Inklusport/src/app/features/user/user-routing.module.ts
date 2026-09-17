import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { roleGuard } from '../../core/guards/role.guard';
import { ProfileManagementComponent } from './pages/profile-management/profile-management.component';
import { OrganizedAthletesComponent } from './pages/organized-athletes/organized-athletes.component';
import { OrganizerDashboardComponent } from './pages/organizer-dashboard/organizer-dashboard.component';
import { TrainerDashboardComponent } from './pages/trainer-dashboard/trainer-dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'profile' },
  { path: 'profile', component: ProfileManagementComponent },
  {
    path: 'athletes',
    component: OrganizedAthletesComponent,
    canActivate: [roleGuard],
    data: { roles: ['ORGANIZADOR'] },
  },
  {
    path: 'organizer',
    component: OrganizerDashboardComponent,
    canActivate: [roleGuard],
    data: { roles: ['ORGANIZADOR'] },
  },
  {
    path: 'trainer',
    component: TrainerDashboardComponent,
    canActivate: [roleGuard],
    data: { roles: ['ENTRENADOR'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
