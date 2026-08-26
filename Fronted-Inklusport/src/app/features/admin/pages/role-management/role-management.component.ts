import { Component } from '@angular/core';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.scss'
})
export class RoleManagementComponent {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
