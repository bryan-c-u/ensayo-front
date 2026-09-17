import { Component } from '@angular/core';

interface CalendarEntry {
  day: string;
  time: string;
  title: string;
  discipline: string;
  place: string;
}

/**
 * M03 - Deportes y Eventos. Calendario del entrenador (rol ENTRENADOR):
 * eventos y sesiones programadas de la semana. Origen: item "Calendario" del
 * trainer-sidebar.
 */
@Component({
  selector: 'app-trainer-calendar',
  templateUrl: './trainer-calendar.component.html',
  styleUrl: './trainer-calendar.component.scss'
})
export class TrainerCalendarComponent {
  readonly weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  readonly entries: CalendarEntry[] = [
    { day: 'Lun', time: '16:00', title: 'Técnica de brazada', discipline: 'Para Natación', place: 'Piscina Olímpica' },
    { day: 'Mar', time: '09:30', title: 'Orientación y tiro', discipline: 'Goalball', place: 'Polideportivo 2' },
    { day: 'Mié', time: '17:00', title: 'Resistencia', discipline: 'Atletismo', place: 'Pista sintética' },
    { day: 'Vie', time: '11:00', title: 'Evaluación inicial', discipline: 'Rugby en silla', place: 'Gimnasio central' },
  ];

  entriesFor(day: string): CalendarEntry[] {
    return this.entries.filter(e => e.day === day);
  }
}
