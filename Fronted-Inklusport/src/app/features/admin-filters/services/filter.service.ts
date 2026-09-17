import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * M07 - Filtros y Búsquedas Administrativas.
 * Estado de filtros compartido y utilidades para construir query params
 * a partir de los criterios seleccionados en las tablas administrativas.
 */
export interface AdminFilterCriteria {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  disabilityType?: string;
  sport?: string;
  city?: string;
  inscriptionStatus?: string;
  quickFilter?: string;
}

@Injectable({ providedIn: 'root' })
export class FilterService {
  private readonly criteriaSubject = new BehaviorSubject<AdminFilterCriteria>({});
  readonly criteria$ = this.criteriaSubject.asObservable();

  get criteria(): AdminFilterCriteria {
    return this.criteriaSubject.value;
  }

  patch(partial: AdminFilterCriteria): void {
    this.criteriaSubject.next({ ...this.criteriaSubject.value, ...partial });
  }

  reset(): void {
    this.criteriaSubject.next({});
  }

  /** Convierte los criterios activos en un objeto listo para HttpParams. */
  toQueryParams(criteria: AdminFilterCriteria = this.criteria): Record<string, string> {
    const params: Record<string, string> = {};
    Object.entries(criteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null && `${value}`.trim() !== '') {
        params[key] = `${value}`;
      }
    });
    return params;
  }
}
