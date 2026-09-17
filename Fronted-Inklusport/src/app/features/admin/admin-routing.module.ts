import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';
import { HistoryStatisticsComponent } from './pages/history-statistics/history-statistics.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'roles', component: RoleManagementComponent },
  { path: 'audit-log', component: HistoryStatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
