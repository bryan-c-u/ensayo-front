import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'events', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
  { path: 'accessibility', loadChildren: () => import('./features/accesibility/accesibility.module').then(m => m.AccesibilityModule) },
  { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
