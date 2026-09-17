import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import {
  AthleteRow,
  EventRegistrationRow,
  EventResponse,
} from '../models/event-models';

/**
 * M03 - Deportes y Eventos. Habla con ink-ms-sports a través del gateway
 * (`/api/events`, `/api/registrations`). El JWT lo añade `authInterceptor`.
 */
@Injectable({ providedIn: 'root' })
export class SportsAndEventsService {
  private readonly base = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  /** Todos los eventos (ink-ms-sports no filtra por organizador). */
  getEvents(): Observable<EventResponse[]> {
    return this.http.get<EventResponse[]>(`${this.base}/api/events`);
  }

  /** Eventos creados por el organizador autenticado (filtro en cliente por `createdBy`). */
  getMisEventos(email: string): Observable<EventResponse[]> {
    return this.getEvents().pipe(
      map((events) => events.filter((e) => (e.createdBy ?? '').toLowerCase() === email.toLowerCase())),
    );
  }

  /** Inscripciones de un evento (vista mínima, sin qrCode). */
  getInscripcionesEvento(eventId: string): Observable<EventRegistrationRow[]> {
    return this.http.get<EventRegistrationRow[]>(`${this.base}/api/registrations/event/${eventId}`);
  }

  /**
   * Atletas inscritos en TODOS los eventos del organizador: para cada evento propio
   * pide sus inscripciones y las aplana en una sola lista.
   */
  getAtletasDeMisEventos(email: string): Observable<AthleteRow[]> {
    return this.getMisEventos(email).pipe(
      switchMap((eventos) => {
        if (!eventos.length) {
          return of([] as AthleteRow[]);
        }
        return forkJoin(eventos.map((e) => this.getInscripcionesEvento(e.id))).pipe(
          map((porEvento) =>
            porEvento.flat().map((r) => ({
              userId: r.userId,
              eventName: r.eventName,
              registrationDate: r.registrationDate,
              estado: r.waitlistPosition != null ? 'Lista de espera' : 'Confirmada',
              asistio: r.attended === true,
            } as AthleteRow)),
          ),
        );
      }),
    );
  }
}
