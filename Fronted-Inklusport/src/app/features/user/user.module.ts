import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { EventsCalendarComponent } from './pages/events-calendar/events-calendar.component';
import { EventRegistrationComponent } from './pages/event-registration/event-registration.component';

@NgModule({
  declarations: [
    EventsCalendarComponent,
    EventRegistrationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
