import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
    { id: 'events', icon: '📅', label: 'Eventos', route: '/admin/events' },
    { id: 'sports', icon: '🏃', label: 'Deportes' },
    { id: 'disabilities', icon: '♿', label: 'Discapacidades', route: '/admin/disabilities' },
    { id: 'roles', icon: '🛡️', label: 'Roles', route: '/admin/roles' },
    { id: 'audit-logs', icon: '📊', label: 'Auditoría', route: '/admin/audit-logs' },
  ];

  constructor(private router: Router) {}

  navigate(item: AdminNavItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
      this.close();
    }
  }

  close(): void {
    this.isOpenChange.emit(false);
  }
}
