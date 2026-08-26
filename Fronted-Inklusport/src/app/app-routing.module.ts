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
  { path: 'events', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
  { path: 'accessibility', loadChildren: () => import('./features/accesibility/accesibility.module').then(m => m.AccesibilityModule) },
  { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
