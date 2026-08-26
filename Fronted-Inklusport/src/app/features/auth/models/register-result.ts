import { AuthResponse } from './auth-response';
import { PendingRoleRequest } from './pending-role-request';

export interface RegisterResult extends AuthResponse {
  pendingRoleRequest: PendingRoleRequest | null;
}
