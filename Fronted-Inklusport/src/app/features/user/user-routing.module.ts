import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventsCalendarComponent } from './pages/events-calendar/events-calendar.component';
import { EventRegistrationComponent } from './pages/event-registration/event-registration.component';

const routes: Routes = [
  { path: '', component: EventsCalendarComponent },
  { path: 'register', component: EventRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
