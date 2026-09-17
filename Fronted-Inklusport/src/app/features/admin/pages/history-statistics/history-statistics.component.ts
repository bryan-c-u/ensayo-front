import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { AdminService } from '../../services/admin.service';
import { AdminUser } from '../../models/admin-user';
import { UserActivity } from '../../models/user-activity';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { httpErrorMessage } from '../../../../core/utils/http-error';

interface DonutSegment {
  label: string;
  count: number;
  pct: number;
  color: string;
  dash: string;
  offset: number;
}

const DONUT_RADIUS = 40;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;
const DONUT_PALETTE = ['#c8102e', '#2563eb', '#0d9488', '#d1d5db', '#f59e0b', '#7c3aed'];

@Component({
  selector: 'app-history-statistics',
  templateUrl: './history-statistics.component.html',
  styleUrl: './history-statistics.component.scss'
})
export class HistoryStatisticsComponent implements OnInit {
  loading = true;
  error: string | null = null;

  activities: UserActivity[] = [];
  currentEmail = '';

  donutSegments: DonutSegment[] = [];
  donutTotal = 0;

  constructor(
    private readonly adminService: AdminService,
    private readonly authState: AuthStateService,
  ) {}

  ngOnInit(): void {
    this.currentEmail = this.authState.email() ?? 'Sesión actual';
    this.loading = true;
    this.error = null;

    forkJoin({
      activities: this.adminService.getMyActivities(),
      users: this.adminService.getUsers(),
    }).subscribe({
      next: ({ activities, users }) => {
        this.activities = activities;
        this.buildDonut(users);
        this.loading = false;
      },
      error: (err) => {
        this.error = httpErrorMessage(err, 'No se pudo cargar la auditoría.');
        this.loading = false;
      },
    });
  }

  actionClass(action: string): string {
    const value = (action ?? '').toUpperCase();
    if (value.includes('DELETE')) {
      return 'action-delete';
    }
    if (value.includes('EXPORT')) {
      return 'action-export';
    }
    return 'action-update';
  }

  datePart(iso: string): string {
    const date = new Date(iso);
    return isNaN(date.getTime()) ? iso : date.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  timePart(iso: string): string {
    const date = new Date(iso);
    return isNaN(date.getTime()) ? '' : date.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  initials(value: string): string {
    return (value || '?').slice(0, 2).toUpperCase();
  }

  private buildDonut(users: AdminUser[]): void {
    const counts = new Map<string, number>();
    for (const user of users) {
      const key = user.disability?.trim() || 'Sin especificar';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    this.donutTotal = users.length;
    const total = users.length || 1;
    let acc = 0;

    this.donutSegments = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, DONUT_PALETTE.length)
      .map(([label, count], index) => {
        const fraction = count / total;
        const length = fraction * DONUT_CIRCUMFERENCE;
        const segment: DonutSegment = {
          label,
          count,
          pct: Math.round(fraction * 100),
          color: DONUT_PALETTE[index],
          dash: `${length} ${DONUT_CIRCUMFERENCE - length}`,
          offset: -acc * DONUT_CIRCUMFERENCE,
        };
        acc += fraction;
        return segment;
      });
  }

}
