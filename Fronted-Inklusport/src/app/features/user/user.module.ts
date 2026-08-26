import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { EventsCalendarComponent } from './pages/events-calendar/events-calendar.component';
import { EventRegistrationComponent } from './pages/event-registration/event-registration.component';
import { ProfileManagementComponent } from './pages/profile-management/profile-management.component';

@NgModule({
  declarations: [
    EventsCalendarComponent,
    EventRegistrationComponent,
    ProfileManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
