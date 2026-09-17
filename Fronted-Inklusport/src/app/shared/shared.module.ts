import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SpaceBackgroundComponent } from './components/space-background/space-background.component';
import { AccessibilityWidgetComponent } from './components/accessibility-widget/accessibility-widget.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { OrganizerSidebarComponent } from './components/organizer-sidebar/organizer-sidebar.component';
import { TrainerSidebarComponent } from './components/trainer-sidebar/trainer-sidebar.component';

@NgModule({
  declarations: [
    SpaceBackgroundComponent,
    AccessibilityWidgetComponent,
    SidebarNavComponent,
    AdminSidebarComponent,
    OrganizerSidebarComponent,
    TrainerSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpaceBackgroundComponent,
    AccessibilityWidgetComponent,
    SidebarNavComponent,
    AdminSidebarComponent,
    OrganizerSidebarComponent,
    TrainerSidebarComponent
  ]
})
export class SharedModule { }
