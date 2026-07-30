import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss'
})
export class SidebarNavComponent {
  sidebarOpen = false;

  readonly usuarioActivo = {
    nombre: 'User Name',
    rol: 'Adaptive Athlete'
  };

  constructor(private router: Router) {}

  openSidebar(): void {
    this.sidebarOpen = true;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  onComingSoon(label: string): void {
    this.closeSidebar();
    alert(`Próximamente: ${label}`);
  }

  handleLogout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
  }
}
