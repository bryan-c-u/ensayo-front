import { RoleRequest } from './role-request';

/** Respuesta de /api/admin/users (ink-ms-users - UserProfileResponse). */
export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  profilePicture: string | null;
  bio: string | null;
  disability: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  pendingRoleRequest: RoleRequest | null;
}
