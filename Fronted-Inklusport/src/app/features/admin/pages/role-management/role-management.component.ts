import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { Role } from '../../models/role';
import { roleLabel } from '../../models/role-labels';
import { httpErrorMessage } from '../../../../core/utils/http-error';

const AVATAR_CLASSES = ['avatar-red', 'avatar-blue', 'avatar-teal', 'avatar-gray'];

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.scss'
})
export class RoleManagementComponent implements OnInit {
  roles: Role[] = [];
  users: AdminUser[] = [];
  loading = true;
  error: string | null = null;

  // Asignación rápida de rol
  targetEmail = '';
  selectedRoleId: number | null = null;
  assigning = false;
  assignMessage: string | null = null;
  assignError: string | null = null;

  readonly roleLabel = roleLabel;

  constructor(private readonly adminService: AdminService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;
    forkJoin({
      roles: this.adminService.getRoles(),
      users: this.adminService.getUsers(),
    }).subscribe({
      next: ({ roles, users }) => {
        this.roles = roles;
        this.users = users;
        if (this.selectedRoleId === null) {
          this.selectedRoleId = roles[0]?.id ?? null;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = httpErrorMessage(err, 'No se pudieron cargar los roles.');
        this.loading = false;
      },
    });
  }

  /** Nº de usuarios que tienen asignado este rol (calculado sobre el directorio). */
  userCount(role: Role): number {
    return this.users.filter((user) =>
      (user.roles ?? []).some((r) => r.toUpperCase() === role.name.toUpperCase()),
    ).length;
  }

  avatarClass(index: number): string {
    return AVATAR_CLASSES[index % AVATAR_CLASSES.length];
  }

  roleInitials(name: string): string {
    return (name ?? '').slice(0, 2).toUpperCase();
  }

  assign(): void {
    this.assignMessage = null;
    this.assignError = null;

    const email = this.targetEmail.trim();
    if (!email || this.selectedRoleId === null) {
      this.assignError = 'Indica el correo del usuario y el rol a asignar.';
      return;
    }

    this.assigning = true;
    this.adminService.assignRole(email, this.selectedRoleId).subscribe({
      next: (result) => {
        this.assigning = false;
        this.assignMessage = result?.message ?? 'Rol asignado correctamente.';
        this.targetEmail = '';
        this.load();
      },
      error: (err) => {
        this.assigning = false;
        this.assignError = httpErrorMessage(err, 'No se pudo asignar el rol.');
      },
    });
  }

}
