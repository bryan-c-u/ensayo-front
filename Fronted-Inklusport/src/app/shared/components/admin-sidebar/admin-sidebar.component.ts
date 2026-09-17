import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStateService } from '../../../core/services/auth-state.service';

interface AdminNavItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
}

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  @Input() isOpen = false;
  @Input() activeItem = 'dashboard';
  @Output() isOpenChange = new EventEmitter<boolean>();

  readonly navItems: AdminNavItem[] = [
    { id: 'dashboard', icon: '🔲', label: 'Panel', route: '/admin' },
    { id: 'users', icon: '👥', label: 'Usuarios', route: '/admin/users' },
    { id: 'roles', icon: '🛡️', label: 'Roles', route: '/admin/roles' },
    { id: 'events', icon: '📅', label: 'Eventos', route: '/events/manage/events' },
    { id: 'sports', icon: '🏃', label: 'Deportes', route: '/events/manage/sports' },
    { id: 'disabilities', icon: '♿', label: 'Discapacidades', route: '/events/manage/disabilities' },
    { id: 'reports', icon: '📈', label: 'Reportes', route: '/reports' },
    { id: 'audit-log', icon: '📊', label: 'Auditoría', route: '/admin/audit-log' },
  ];

  constructor(
    private router: Router,
    private authState: AuthStateService,
  ) {}

  navigate(item: AdminNavItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
      this.close();
    }
  }

  logout(): void {
    this.authState.clearToken();
    this.router.navigate(['/login']);
  }

  close(): void {
    this.isOpenChange.emit(false);
  }
}
