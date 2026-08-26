import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { EventManagementComponent } from './pages/event-management/event-management.component';
import { CreateEventsComponent } from './pages/create-events/create-events.component';
import { DisabilityManagementComponent } from './pages/disability-management/disability-management.component';
import { CreationDisabilitiesComponent } from './pages/creation-disabilities/creation-disabilities.component';
import { HistoryStatisticsComponent } from './pages/history-statistics/history-statistics.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'events', component: EventManagementComponent },
  { path: 'events/create', component: CreateEventsComponent },
  { path: 'disabilities', component: DisabilityManagementComponent },
  { path: 'disabilities/create', component: CreationDisabilitiesComponent },
  { path: 'audit-logs', component: HistoryStatisticsComponent },
  { path: 'roles', component: RoleManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
