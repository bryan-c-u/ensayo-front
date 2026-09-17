import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStateService } from '../../../core/services/auth-state.service';

interface OrganizerNavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

@Component({
  selector: 'app-organizer-sidebar',
  templateUrl: './organizer-sidebar.component.html',
  styleUrl: './organizer-sidebar.component.scss'
})
export class OrganizerSidebarComponent {
  /** Ítem activo del menú (resalta el enlace correspondiente). */
  @Input() activeItem = 'dashboard';

  /** Menú oculto/visible. Autónomo: no depende de ninguna barra superior. */
  @HostBinding('class.collapsed')
  collapsed = false;

  readonly navItems: OrganizerNavItem[] = [
    { id: 'dashboard', icon: '🔲', label: 'Panel', route: '/users/organizer' },
    { id: 'events', icon: '📅', label: 'Eventos', route: '/events/organizer/events' },
    { id: 'athletes', icon: '👥', label: 'Atletas', route: '/users/athletes' },
    { id: 'analysis', icon: '📊', label: 'Análisis', route: '/reports/organizer' },
    { id: 'calendar', icon: '🗓️', label: 'Calendario', route: '/events/organizer/calendar' },
    { id: 'ai-assistant', icon: '🤖', label: 'Asistente AI', route: '/assistant/organizer' },
  ];

  readonly secondaryItems: OrganizerNavItem[] = [
    { id: 'subscription', icon: '💳', label: 'Suscripción', route: '/subscriptions/planes' },
    { id: 'profile', icon: '👤', label: 'Perfil', route: '/users/profile' },
  ];

  constructor(private router: Router, private authState: AuthStateService) {}

  /** Esconder / mostrar el menú lateral. */
  toggle(): void {
    this.collapsed = !this.collapsed;
  }

  navigate(item: OrganizerNavItem): void {
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
