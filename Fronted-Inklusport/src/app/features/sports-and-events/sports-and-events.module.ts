import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { AdminFiltersModule } from '../admin-filters/admin-filters.module';
import { SportsAndEventsRoutingModule } from './sports-and-events-routing.module';

import { EventsCalendarComponent } from './pages/events-calendar/events-calendar.component';
import { EventRegistrationComponent } from './pages/event-registration/event-registration.component';
import { SportsManagementComponent } from './pages/sports-management/sports-management.component';
import { DisabilityManagementComponent } from './pages/disability-management/disability-management.component';
import { CreationDisabilitiesComponent } from './pages/creation-disabilities/creation-disabilities.component';
import { EventManagementComponent } from './pages/event-management/event-management.component';
import { CreateEventsComponent } from './pages/create-events/create-events.component';
import { TrainerCalendarComponent } from './pages/trainer-calendar/trainer-calendar.component';
import { TrainerSessionsComponent } from './pages/trainer-sessions/trainer-sessions.component';
import { OrganizerCalendarComponent } from './pages/organizer-calendar/organizer-calendar.component';
import { OrganizerEventsComponent } from './pages/organizer-events/organizer-events.component';

/**
 * M03 - Gestión de Deportes, Discapacidades y Eventos.
 * Reúne el catálogo de deportes adaptados, los tipos de discapacidad y su
 * vinculación, más el ciclo de vida de eventos e inscripciones (parte usuario
 * y parte gestión).
 */
@NgModule({
  declarations: [
    EventsCalendarComponent,
    EventRegistrationComponent,
    SportsManagementComponent,
    DisabilityManagementComponent,
    CreationDisabilitiesComponent,
    EventManagementComponent,
    CreateEventsComponent,
    TrainerCalendarComponent,
    TrainerSessionsComponent,
    OrganizerCalendarComponent,
    OrganizerEventsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AdminFiltersModule,
    SportsAndEventsRoutingModule
  ]
})
export class SportsAndEventsModule { }
