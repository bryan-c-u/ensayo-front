import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentResultComponent } from './pages/payment-result/payment-result.component';

/**
 * Módulo de retorno de pagos: renderiza el resultado del checkout de Mercado Pago
 * (/pagos/exito|pendiente|error) y hace polling del estado real contra
 * ink-ms-suscripciones hasta que el pago se resuelve.
 */
@NgModule({
  declarations: [PaymentResultComponent],
  imports: [CommonModule, PaymentsRoutingModule],
})
export class PaymentsModule {}
