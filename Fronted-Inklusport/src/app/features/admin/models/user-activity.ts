/** ink-ms-users - UserActivityResponse (historial del usuario autenticado). */
export interface UserActivity {
  id: string;
  action: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}
