import { PendingRoleRequest } from './pending-role-request';

export interface UserProfileResponse {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  profilePicture: string;
  bio: string;
  disability: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  roles: string[];
  pendingRoleRequest: PendingRoleRequest | null;
}
