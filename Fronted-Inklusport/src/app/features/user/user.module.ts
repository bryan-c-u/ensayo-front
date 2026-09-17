import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { ProfileManagementComponent } from './pages/profile-management/profile-management.component';
import { OrganizedAthletesComponent } from './pages/organized-athletes/organized-athletes.component';
import { OrganizerDashboardComponent } from './pages/organizer-dashboard/organizer-dashboard.component';
import { TrainerDashboardComponent } from './pages/trainer-dashboard/trainer-dashboard.component';

@NgModule({
  declarations: [
    ProfileManagementComponent,
    OrganizedAthletesComponent,
    OrganizerDashboardComponent,
    TrainerDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
