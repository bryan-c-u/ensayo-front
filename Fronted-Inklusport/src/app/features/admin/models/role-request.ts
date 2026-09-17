export type RoleRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

/** ink-ms-users - RoleRequestResponse. Solicitud de rol ENTRENADOR/ORGANIZADOR. */
export interface RoleRequest {
  id: string;
  userEmail: string;
  userFullName: string;
  requestedRole: string;
  status: string;
  requestedAt: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewNotes: string | null;
}
