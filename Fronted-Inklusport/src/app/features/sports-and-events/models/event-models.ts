/** M03 - Deportes y Eventos: modelos alineados con los DTO de ink-ms-sports. */

export type EventStatus = 'draft' | 'active' | 'cancelled' | 'finished';

/** GET /api/events (EventResponse) */
export interface EventResponse {
  id: string;
  sportId: number;
  sportName: string;
  name: string;
  description: string | null;
  eventDate: string;
  eventTime: string;
  location: string | null;
  maxCapacity: number;
  availableCapacity: number;
  status: EventStatus;
  /** Correo del organizador que creó el evento. */
  createdBy: string | null;
  createdAt: string;
}

/** GET /api/registrations/event/{eventId} (InternalRegistrationResponse) */
export interface EventRegistrationRow {
  id: string;
  userId: string;
  eventId: string;
  eventName: string;
  registrationDate: string;
  attended: boolean | null;
  waitlistPosition: number | null;
}

/** Fila derivada para la vista "Atletas de mis eventos". */
export interface AthleteRow {
  userId: string;
  eventName: string;
  registrationDate: string;
  estado: 'Confirmada' | 'Lista de espera';
  asistio: boolean;
}
