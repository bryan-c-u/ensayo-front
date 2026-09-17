import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { primaryRoleLabel, roleBadgeClass } from '../../models/role-labels';
import { ReportService } from '../../../reports/services/report.service';
import { httpErrorMessage } from '../../../../core/utils/http-error';

type UserFilter = 'todos' | 'activos';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  users: AdminUser[] = [];
  loading = true;
  error: string | null = null;

  search = '';
  filter: UserFilter = 'todos';
  /** Correo del usuario cuyo estado se está cambiando (para deshabilitar su botón). */
  busyEmail: string | null = null;

  readonly roleLabel = primaryRoleLabel;
  readonly roleClass = roleBadgeClass;

  constructor(
    private readonly adminService: AdminService,
    private readonly reports: ReportService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    this.adminService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = httpErrorMessage(err, 'No se pudieron cargar los usuarios.');
        this.loading = false;
      },
    });
  }

  get filteredUsers(): AdminUser[] {
    const term = this.search.trim().toLowerCase();
    return this.users.filter((user) => {
      if (this.filter === 'activos' && !user.isActive) {
        return false;
      }
      if (!term) {
        return true;
      }
      return (
        (user.fullName ?? '').toLowerCase().includes(term) ||
        (user.email ?? '').toLowerCase().includes(term) ||
        (user.id ?? '').toLowerCase().includes(term)
      );
    });
  }

  setFilter(filter: UserFilter): void {
    this.filter = filter;
  }

  toggleActive(user: AdminUser): void {
    this.busyEmail = user.email;
    this.error = null;
    const request$ = user.isActive
      ? this.adminService.deactivateUser(user.email)
      : this.adminService.activateUser(user.email);

    request$.subscribe({
      next: () => {
        user.isActive = !user.isActive;
        this.busyEmail = null;
      },
      error: (err) => {
        this.error = httpErrorMessage(err, 'No se pudo actualizar el estado del usuario.');
        this.busyEmail = null;
      },
    });
  }

  exportCsv(): void {
    this.reports.exportCsv(
      this.filteredUsers.map((user) => ({
        id: user.id,
        nombre: user.fullName,
        correo: user.email,
        telefono: user.phone ?? '',
        rol: this.roleLabel(user.roles),
        discapacidad: user.disability ?? 'Ninguna',
        estado: user.isActive ? 'Activo' : 'Bloqueado',
      })),
      'usuarios-inklusport.csv',
    );
  }
}
