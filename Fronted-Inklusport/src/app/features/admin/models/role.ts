/** /api/admin/users/roles (ink-ms-users - RoleResponse). */
export interface Role {
  id: number;
  name: string;
  description: string;
}

/** Respuesta de POST /api/admin/users/{email}/roles (AssignRoleResponse). */
export interface AssignRoleResult {
  email: string;
  roleId: number;
  roleName: string;
  message: string;
}
