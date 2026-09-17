/** Nombre canonico de rol (como viaja en el JWT / backend) -> etiqueta en español. */
const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Administrador',
  ENTRENADOR: 'Entrenador',
  ORGANIZADOR: 'Organizador',
  USUARIO: 'Usuario',
};

/** Etiqueta legible para un rol individual. */
export function roleLabel(role: string | undefined | null): string {
  if (!role) {
    return '—';
  }
  return ROLE_LABELS[role.toUpperCase()] ?? role;
}

/** Etiqueta del rol principal de un usuario (el primero de su lista). */
export function primaryRoleLabel(roles: string[] | undefined | null): string {
  return roleLabel(roles?.[0]);
}

/** Clase CSS del badge segun el rol principal (reutiliza estilos existentes). */
export function roleBadgeClass(roles: string[] | undefined | null): string {
  switch ((roles?.[0] ?? '').toUpperCase()) {
    case 'ADMIN':
      return 'role-admin';
    case 'ENTRENADOR':
    case 'ORGANIZADOR':
      return 'role-coach';
    default:
      return 'role-athlete';
  }
}
