import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceBackgroundComponent } from './components/space-background/space-background.component';
import { AccessibilityWidgetComponent } from './components/accessibility-widget/accessibility-widget.component';

@NgModule({
  declarations: [
    SpaceBackgroundComponent,
    AccessibilityWidgetComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpaceBackgroundComponent,
    AccessibilityWidgetComponent
  ]
})
export class SharedModule { }
