import { Component } from '@angular/core';

@Component({
  selector: 'app-disability-management',
  templateUrl: './disability-management.component.html',
  styleUrl: './disability-management.component.scss'
})
export class DisabilityManagementComponent {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
