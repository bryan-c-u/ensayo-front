import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { EventManagementComponent } from './pages/event-management/event-management.component';
import { CreateEventsComponent } from './pages/create-events/create-events.component';
import { DisabilityManagementComponent } from './pages/disability-management/disability-management.component';
import { CreationDisabilitiesComponent } from './pages/creation-disabilities/creation-disabilities.component';
import { HistoryStatisticsComponent } from './pages/history-statistics/history-statistics.component';
import { RoleManagementComponent } from './pages/role-management/role-management.component';


@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminSidebarComponent,
    UserManagementComponent,
    EventManagementComponent,
    CreateEventsComponent,
    DisabilityManagementComponent,
    CreationDisabilitiesComponent,
    HistoryStatisticsComponent,
    RoleManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
