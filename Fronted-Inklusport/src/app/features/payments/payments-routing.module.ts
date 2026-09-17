import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaymentResultComponent } from './pages/payment-result/payment-result.component';

/**
 * Rutas de retorno del checkout de Mercado Pago. Deben coincidir con
 * MP_BACK_URL_SUCCESS / PENDING / FAILURE de ink-ms-suscripciones.
 */
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'exito' },
  { path: 'exito', component: PaymentResultComponent, data: { resultado: 'exito' } },
  { path: 'pendiente', component: PaymentResultComponent, data: { resultado: 'pendiente' } },
  { path: 'error', component: PaymentResultComponent, data: { resultado: 'error' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
