import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AdminUser } from '../models/admin-user';
import { Role, AssignRoleResult } from '../models/role';
import { RoleRequest, RoleRequestStatus } from '../models/role-request';
import { UserActivity } from '../models/user-activity';
import { Page } from '../models/page';

/**
 * M01 - Gestion administrativa de usuarios y roles.
 * Habla con ink-ms-users a traves del gateway:
 *   - /api/admin/users/**   (requiere rol ADMIN en el JWT)
 *   - /api/users/perfil/**  (usuario autenticado)
 */
@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly usersUrl = `${environment.apiUrl}/api/admin/users`;
  private readonly profileUrl = `${environment.apiUrl}/api/users`;

  constructor(private readonly http: HttpClient) {}

  // ===== Usuarios =====
  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(this.usersUrl);
  }

  getActiveUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(`${this.usersUrl}/active`);
  }

  countUsers(): Observable<number> {
    return this.http.get<number>(`${this.usersUrl}/count`);
  }

  countActiveUsers(): Observable<number> {
    return this.http.get<number>(`${this.usersUrl}/active/count`);
  }

  activateUser(email: string): Observable<void> {
    return this.http.post<void>(`${this.usersUrl}/${encodeURIComponent(email)}/activate`, {});
  }

  deactivateUser(email: string): Observable<void> {
    return this.http.post<void>(`${this.usersUrl}/${encodeURIComponent(email)}/deactivate`, {});
  }

  // ===== Roles =====
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.usersUrl}/roles`);
  }

  getUserRoles(email: string): Observable<string[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<string[]>(`${this.usersUrl}/roles-by-email`, { params });
  }

  assignRole(email: string, roleId: number): Observable<AssignRoleResult> {
    return this.http.post<AssignRoleResult>(
      `${this.usersUrl}/${encodeURIComponent(email)}/roles`,
      { roleId },
    );
  }

  removeRole(email: string, roleId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.usersUrl}/${encodeURIComponent(email)}/roles/${roleId}`,
    );
  }

  // ===== Solicitudes de rol =====
  getRoleRequests(
    status: RoleRequestStatus = 'PENDING',
    page = 0,
    size = 20,
  ): Observable<Page<RoleRequest>> {
    const params = new HttpParams()
      .set('status', status)
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<RoleRequest>>(`${this.usersUrl}/role-requests`, { params });
  }

  approveRoleRequest(id: string, notes?: string): Observable<RoleRequest> {
    return this.http.post<RoleRequest>(
      `${this.usersUrl}/role-requests/${id}/approve`,
      { notes: notes ?? null },
    );
  }

  rejectRoleRequest(id: string, notes?: string): Observable<RoleRequest> {
    return this.http.post<RoleRequest>(
      `${this.usersUrl}/role-requests/${id}/reject`,
      { notes: notes ?? null },
    );
  }

  // ===== Historial de actividad del usuario autenticado =====
  getMyActivities(): Observable<UserActivity[]> {
    return this.http.get<UserActivity[]>(`${this.profileUrl}/perfil/activities`);
  }
}
