import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccessibilityPanelComponent } from './pages/accessibility-panel/accessibility-panel.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

const routes: Routes = [
  { path: '', component: AccessibilityPanelComponent },
  { path: 'notifications', component: NotificationsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesibilityRoutingModule { }
