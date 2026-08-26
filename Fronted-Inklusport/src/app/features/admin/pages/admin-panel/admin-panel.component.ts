import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {
  sidebarOpen = false;

  stats = [
    { label: 'USUARIOS TOTALES', value: '14,284', note: '+12% vs año anterior', icon: '👥', iconBg: '#FEE2E2', iconColor: '#991B1B' },
    { label: 'EVENTOS ACTIVOS', value: '42', note: 'En vivo ahora', icon: '⚡', iconBg: '#DBEAFE', iconColor: '#1E40AF' },
    { label: 'ALERTAS IA', value: '07', note: 'Alta prioridad', icon: '⚠️', iconBg: '#FEEDE4', iconColor: '#9A3412' },
    { label: 'ASISTENCIA PROM.', value: '88.5%', note: '94% eficiencia', icon: '📈', iconBg: '#DCFCE7', iconColor: '#166534' },
  ];

  recentUsers = [
    { id: '#INK-2201', name: 'Elena Rodríguez', email: 'e.rodriguez@inklusport.org', status: 'Activo' },
    { id: '#INK-2188', name: 'Mark Thompson', email: 'm.thompson@inklusport.org', status: 'Bloqueado' },
    { id: '#INK-2195', name: 'Sarah Jenkins', email: 's.jenkins@inklusport.org', status: 'Pendiente' },
    { id: '#INK-2182', name: 'Liam O’Neill', email: 'l.oneill@inklusport.org', status: 'Activo' },
  ];

  participation = [
    { label: 'DISCAPACIDAD FÍSICA', value: 45, color: '#DC2626' },
    { label: 'DISCAPACIDAD VISUAL', value: 22, color: '#2563EB' },
    { label: 'DISCAPACIDAD INTELECTUAL', value: 18, color: '#D97706' },
    { label: 'DISCAPACIDAD AUDITIVA', value: 15, color: '#7C3AED' },
  ];

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

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  handleLogout(): void {
    this.router.navigate(['/login']);
  }
}