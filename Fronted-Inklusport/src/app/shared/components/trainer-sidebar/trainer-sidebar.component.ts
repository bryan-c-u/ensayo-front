import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStateService } from '../../../core/services/auth-state.service';

interface TrainerNavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

@Component({
  selector: 'app-trainer-sidebar',
  templateUrl: './trainer-sidebar.component.html',
  styleUrl: './trainer-sidebar.component.scss'
})
export class TrainerSidebarComponent {
  /** Ítem activo del menú (resalta el enlace correspondiente). */
  @Input() activeItem = 'dashboard';

  /** Menú oculto/visible. Autónomo: no depende de ninguna barra superior. */
  @HostBinding('class.collapsed')
  collapsed = false;

  readonly navItems: TrainerNavItem[] = [
    { id: 'dashboard', icon: '🔲', label: 'Panel', route: '/users/trainer' },
    { id: 'analysis', icon: '📊', label: 'Análisis', route: '/reports/trainer' },
    { id: 'calendar', icon: '🗓️', label: 'Calendario', route: '/events/trainer/calendar' },
    { id: 'sessions', icon: '🏋️', label: 'Sesiones', route: '/events/trainer/sessions' },
    { id: 'ai-assistant', icon: '🤖', label: 'Asistente AI', route: '/assistant' },
  ];

  readonly secondaryItems: TrainerNavItem[] = [
    { id: 'profile', icon: '👤', label: 'Perfil', route: '/users/profile' },
  ];

  constructor(private router: Router, private authState: AuthStateService) {}

  /** Esconder / mostrar el menú lateral. */
  toggle(): void {
    this.collapsed = !this.collapsed;
  }

  navigate(item: TrainerNavItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    }
  }

  /** Salir: cierra sesión y vuelve al inicio. */
  logout(): void {
    this.authState.clearToken();
    this.router.navigate(['/']);
  }
}
