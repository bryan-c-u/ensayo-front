import { Component, signal, computed } from '@angular/core';

export interface Notificacion {
  id: number;
  titulo: string;
  mensaje: string;
  tiempo: string;
  categoria: 'Urgentes' | 'Sistema';
  destacada: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  // Simulación del estado global de notificaciones sonoras (reemplaza por tu servicio si aplica)
  notifSonoras = signal<boolean>(true);
  
  opcionesFiltro = ['Todas', 'Urgentes', 'Sistema'];
  filtroActivo = signal<string>('Todas');

  listaNotificaciones = signal<Notificacion[]>([
    {
      id: 1,
      titulo: '15 minutos para nadar!',
      mensaje: 'El torneo de natación inclusiva comenzará en 15 minutos en el carril central. Por favor, preparen su equipamiento.',
      tiempo: 'HACE 2 MIN',
      categoria: 'Urgentes',
      destacada: true
    },
    {
      id: 2,
      titulo: 'Recordatorio de Calentamiento',
      mensaje: 'Recordatorio: Sesión de entrenamiento con el Entrenador Javier a las 16:30. No olvides tu hidratación.',
      tiempo: 'HACE 45 MIN',
      categoria: 'Urgentes',
      destacada: false
    },
    {
      id: 3,
      titulo: 'Voces actualizadas',
      mensaje: 'Se han optimizado las voces del lector de pantalla para mayor claridad en ambientes ruidosos.',
      tiempo: 'HOY, 09:15 AM',
      categoria: 'Sistema',
      destacada: false
    }
  ]);

  notificacionesFiltradas = computed(() => {
    const filtro = this.filtroActivo();
    if (filtro === 'Todas') {
      return this.listaNotificaciones();
    }
    return this.listaNotificaciones().filter(n => n.categoria === filtro);
  });

  setFiltro(filtro: string) {
    this.filtroActivo.set(filtro);
  }

  reproducirAudioTexto(texto: string) {
    if (!this.notifSonoras()) {
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta la reproducción de audio por voz.');
    }
  }

  marcarComoLeida(id: number) {
    this.listaNotificaciones.update(lista => lista.filter(n => n.id !== id));
  }
}