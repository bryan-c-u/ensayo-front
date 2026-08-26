import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state.service';

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Administrador',
  ENTRENADOR: 'Entrenador',
  ORGANIZADOR: 'Organizador',
  USUARIO: 'Atleta Adaptado'
};

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss'
})
export class SidebarNavComponent {
  sidebarOpen = false;

  readonly usuarioActivo = {
    nombre: 'User Name'
  };

  constructor(private router: Router, private authState: AuthStateService) {}

  get rolActivo(): string {
    const role = this.authState.primaryRole();
    return role ? (ROLE_LABELS[role] ?? role) : 'Atleta Adaptado';
  }

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
    this.authState.clearToken();
    this.router.navigate(['/']);
  }
}
