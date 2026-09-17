import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
  },
  { path: 'events', loadChildren: () => import('./features/sports-and-events/sports-and-events.module').then(m => m.SportsAndEventsModule) },
  { path: 'users', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
  { path: 'reports', loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule) },
  { path: 'assistant', loadChildren: () => import('./features/assistant/assistant.module').then(m => m.AssistantModule) },
  { path: 'subscriptions', loadChildren: () => import('./features/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule) },
  { path: 'pagos', loadChildren: () => import('./features/payments/payments.module').then(m => m.PaymentsModule) },
  { path: 'accessibility', loadChildren: () => import('./features/accesibility/accesibility.module').then(m => m.AccesibilityModule) },
  { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
