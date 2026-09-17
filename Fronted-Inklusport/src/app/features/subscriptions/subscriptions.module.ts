import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';

import { OrganizerPlansComponent } from './pages/organizer-plans/organizer-plans.component';
import { EstadoSuscripcionComponent } from './pages/estado-suscripcion/estado-suscripcion.component';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';

/**
 * M09 - Suscripciones y monetización.
 * Planes de organizador, estado de la suscripción y renovación, con cobro vía
 * Mercado Pago. Backend: ink-ms-suscripciones. La página de retorno del checkout
 * (/pagos/*) vive en el módulo `payments`.
 */
@NgModule({
  declarations: [OrganizerPlansComponent, EstadoSuscripcionComponent, PaymentGatewayComponent],
  imports: [CommonModule, SharedModule, SubscriptionsRoutingModule],
})
export class SubscriptionsModule {}
