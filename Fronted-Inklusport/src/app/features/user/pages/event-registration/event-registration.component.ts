import { Component } from '@angular/core';

interface EventoDetalle {
  titulo: string;
  categoria: string;
  imagenUrl: string;
  fecha: string;
  hora: string;
  lugar: string;
  descripcion: string;
  requisitos: string;
  cuposDisponibles: number;
  inscritos: number;
  cupoTotal: number;
  entrenador: {
    nombre: string;
    especialidad: string;
    avatarUrl: string;
  };
}

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.scss'
})
export class EventRegistrationComponent {
  readonly evento: EventoDetalle = {
    titulo: 'Clínica de Baloncesto en Silla de Ruedas',
    categoria: 'Deporte Adaptado',
    imagenUrl: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=600&h=400&fit=crop',
    fecha: '24 de Mayo, 2024',
    hora: '10:00 AM - 1:00 PM',
    lugar: 'Gimnasio Central',
    descripcion: 'Únete a nuestra clínica intensiva diseñada para atletas de todos los niveles. Aprenderás técnicas avanzadas de manejo de silla, tiro dinámico y estrategias de juego en equipo. Nuestro enfoque es 100% inclusivo, fomentando el desarrollo personal a través de la excelencia deportiva.',
    requisitos: 'Traer ropa deportiva, hidratación propia. Se proveerán sillas de competencia si es necesario.',
    cuposDisponibles: 12,
    inscritos: 38,
    cupoTotal: 50,
    entrenador: {
      nombre: 'Julian Alexander',
      especialidad: 'Especialista en Alto Rendimiento y Deporte Adaptado',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    }
  };

  get porcentajeInscritos(): number {
    return Math.round((this.evento.inscritos / this.evento.cupoTotal) * 100);
  }

  onConfirmarInscripcion(): void {
    alert('¡Inscripción simulada con éxito!');
  }
}
