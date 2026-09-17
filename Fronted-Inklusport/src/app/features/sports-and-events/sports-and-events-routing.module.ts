import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { roleGuard } from '../../core/guards/role.guard';

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
 * Rutas de usuario (sin guard) bajo /events y rutas de gestión (rol ADMIN)
 * bajo /events/manage/*.
 */
const routes: Routes = [
  { path: '', component: EventsCalendarComponent },
  { path: 'register', component: EventRegistrationComponent },
  {
    path: 'manage',
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sports' },
      { path: 'sports', component: SportsManagementComponent },
      { path: 'disabilities', component: DisabilityManagementComponent },
      { path: 'disabilities/create', component: CreationDisabilitiesComponent },
      { path: 'events', component: EventManagementComponent },
      { path: 'events/create', component: CreateEventsComponent },
    ],
  },
  {
    path: 'trainer',
    canActivate: [roleGuard],
    data: { roles: ['ENTRENADOR'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'calendar' },
      { path: 'calendar', component: TrainerCalendarComponent },
      { path: 'sessions', component: TrainerSessionsComponent },
    ],
  },
  {
    path: 'organizer',
    canActivate: [roleGuard],
    data: { roles: ['ORGANIZADOR'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'calendar' },
      { path: 'calendar', component: OrganizerCalendarComponent },
      { path: 'events', component: OrganizerEventsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsAndEventsRoutingModule { }
