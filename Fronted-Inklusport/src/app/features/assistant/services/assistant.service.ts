import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface AssistantMessage {
  author: 'user' | 'assistant';
  text: string;
  at: Date;
}

export interface SportRecommendation {
  sport: string;
  reason: string;
}

/**
 * M08 - Asistente Virtual Inteligente.
 * Recomendaciones deportivas y organización de agendas / rutinas.
 * Respuestas simuladas hasta conectar con el backend del asistente.
 */
@Injectable({ providedIn: 'root' })
export class AssistantService {
  ask(prompt: string): Observable<AssistantMessage> {
    const reply: AssistantMessage = {
      author: 'assistant',
      text: `He registrado tu consulta ("${prompt}"). Cuando el asistente esté conectado te daré una recomendación personalizada.`,
      at: new Date(),
    };
    return of(reply).pipe(delay(400));
  }

  getRecommendations(): Observable<SportRecommendation[]> {
    return of([
      { sport: 'Para Natación', reason: 'Bajo impacto articular y buena progresión cardiovascular.' },
      { sport: 'Goalball', reason: 'Trabajo de orientación espacial y juego en equipo.' },
    ]).pipe(delay(300));
  }
}
