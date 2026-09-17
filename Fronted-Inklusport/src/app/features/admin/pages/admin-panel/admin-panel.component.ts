import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { httpErrorMessage } from '../../../../core/utils/http-error';

interface StatCard {
  label: string;
  value: string;
  note: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  status: 'Activo' | 'Bloqueado' | 'Pendiente';
}

interface ParticipationRow {
  label: string;
  value: number;
  color: string;
}

const PARTICIPATION_PALETTE = ['#DC2626', '#2563EB', '#D97706', '#7C3AED', '#0D9488'];

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  loading = true;
  error: string | null = null;

  stats: StatCard[] = [
    { label: 'USUARIOS TOTALES', value: '—', note: 'Cargando…', icon: '👥', iconBg: '#FEE2E2', iconColor: '#991B1B' },
    { label: 'EVENTOS ACTIVOS', value: '42', note: 'En vivo ahora', icon: '⚡', iconBg: '#DBEAFE', iconColor: '#1E40AF' },
    { label: 'ALERTAS IA', value: '07', note: 'Alta prioridad', icon: '⚠️', iconBg: '#FEEDE4', iconColor: '#9A3412' },
    { label: 'ASISTENCIA PROM.', value: '88.5%', note: '94% eficiencia', icon: '📈', iconBg: '#DCFCE7', iconColor: '#166534' },
  ];

  recentUsers: RecentUser[] = [];
  participation: ParticipationRow[] = [];

  activities = [
    {
      type: 'INFORME CRÍTICO · 2M ATRÁS',
      title: 'Evento activador HU25',
      detail: 'Umbral de capacidad alcanzado para "National Wheelchair Open". Se activaron la logística de escalado automático.',
      dotColor: '#DC2626'
    },
    {
      type: 'OPTIMIZACIÓN · 45M ATRÁS',
      title: 'Pronóstico de asistencia',
      detail: 'La IA predice 92% de asistencia para las sesiones del sábado. Voluntarios notificados.',
      dotColor: '#0EA5E9'
    },
    {
      type: 'AUDITORÍA DEL SISTEMA · 2H ATRÁS',
      title: 'Verificación de cumplimiento',
      detail: 'El módulo HU33 aprobó la validación de accesibilidad para todos los eventos activos.',
      dotColor: '#2563EB'
    },
    {
      type: 'ALERTA URGENTE · 4H ATRÁS',
      title: 'Desconexión de sensor',
      detail: 'El concentrador de datos biométricos en el Sector HU46 informa señal intermitente.',
      dotColor: '#DC2626'
    },
  ];

  constructor(private readonly adminService: AdminService) {}

  ngOnInit(): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      total: this.adminService.countUsers(),
      active: this.adminService.countActiveUsers(),
      users: this.adminService.getUsers(),
    }).subscribe({
      next: ({ total, active, users }) => {
        this.stats[0] = {
          ...this.stats[0],
          value: total.toLocaleString('es-CO'),
          note: `${active.toLocaleString('es-CO')} activos`,
        };
        this.recentUsers = this.buildRecentUsers(users);
        this.participation = this.buildParticipation(users);
        this.loading = false;
      },
      error: (err) => {
        this.error = httpErrorMessage(err, 'No se pudo cargar el panel administrativo.');
        this.stats[0] = { ...this.stats[0], value: '—', note: 'Sin datos' };
        this.loading = false;
      },
    });
  }

  private buildRecentUsers(users: AdminUser[]): RecentUser[] {
    return [...users]
      .sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''))
      .slice(0, 4)
      .map((user) => ({
        id: `#${user.id}`,
        name: user.fullName,
        email: user.email,
        status: user.isActive ? 'Activo' : 'Bloqueado',
      }));
  }

  private buildParticipation(users: AdminUser[]): ParticipationRow[] {
    const counts = new Map<string, number>();
    for (const user of users) {
      const key = user.disability?.trim() || 'Sin especificar';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    const total = users.length || 1;
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, PARTICIPATION_PALETTE.length)
      .map(([label, count], index) => ({
        label: label.toUpperCase(),
        value: Math.round((count / total) * 100),
        color: PARTICIPATION_PALETTE[index],
      }));
  }

}
