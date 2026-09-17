import { Component } from '@angular/core';

interface CalendarDay {
  day: number;
  otherMonth?: boolean;
  selected?: boolean;
  hasEvent?: boolean;
  eventMuted?: boolean;
}

@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrl: './events-calendar.component.scss'
})
export class EventsCalendarComponent {
  readonly dayLabels = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  readonly currentMonthLabel = 'Octubre 2024';

  readonly calendarDays: CalendarDay[] = [
    { day: 29, otherMonth: true }, { day: 30, otherMonth: true },
    { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 },

    { day: 6 }, { day: 7 }, { day: 8 }, { day: 9, hasEvent: true },
    { day: 10, selected: true, hasEvent: true }, { day: 11, hasEvent: true }, { day: 12 },

    { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 },

    { day: 20 }, { day: 21 }, { day: 22, hasEvent: true, eventMuted: true }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 },

    { day: 27 }, { day: 28 }, { day: 29 }, { day: 30, hasEvent: true, eventMuted: true }, { day: 31 },
    { day: 1, otherMonth: true }, { day: 2, otherMonth: true }
  ];

  onPrevMonth(): void {
    alert('Próximamente: navegación de calendario');
  }

  onNextMonth(): void {
    alert('Próximamente: navegación de calendario');
  }

  onSelectDay(day: CalendarDay): void {
    if (day.otherMonth) {
      return;
    }
    this.calendarDays.forEach(d => d.selected = false);
    day.selected = true;
  }

  onRegisterEvent(): void {
    alert('¡Inscripción simulada con éxito!');
  }

  onMarkAttendance(): void {
    alert('Asistencia registrada');
  }

  onLeaveEvent(): void {
    alert('Has salido del evento');
  }

  onViewAiDetails(): void {
    alert('Abriendo detalles de la recomendación de IA...');
  }
}
