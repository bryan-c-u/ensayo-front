import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { AccessibilityPanelComponent } from './pages/accessibility-panel/accessibility-panel.component';



@NgModule({
  declarations: [
    NotificationsComponent,
    AccessibilityPanelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccesibilityModule { }
