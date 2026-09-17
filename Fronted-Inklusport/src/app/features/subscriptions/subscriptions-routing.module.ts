import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizerPlansComponent } from './pages/organizer-plans/organizer-plans.component';
import { EstadoSuscripcionComponent } from './pages/estado-suscripcion/estado-suscripcion.component';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'planes' },
  { path: 'planes', component: OrganizerPlansComponent },
  { path: 'estado', component: EstadoSuscripcionComponent },
  { path: 'pago/:referencia', component: PaymentGatewayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionsRoutingModule {}
