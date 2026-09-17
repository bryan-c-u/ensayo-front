import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminFilterCriteria } from '../../services/filter.service';

/**
 * M07 - Panel de filtros avanzados administrativos.
 * Campos según el documento: fecha, tipo de discapacidad, deporte, ciudad,
 * estado de inscripción. El contenedor decide qué campos mostrar via los flags.
 */
@Component({
  selector: 'app-advanced-filters',
  templateUrl: './advanced-filters.component.html',
  styleUrl: './advanced-filters.component.scss'
})
export class AdvancedFiltersComponent {
  @Input() showDateRange = true;
  @Input() showDisability = true;
  @Input() showSport = true;
  @Input() showCity = true;
  @Input() showInscriptionStatus = true;

  @Input() disabilityTypes: string[] = ['Visual', 'Motriz', 'Auditiva', 'Intelectual', 'Otra'];
  @Input() sports: string[] = [];
  @Input() cities: string[] = [];
  @Input() inscriptionStatuses: string[] = ['Pendiente', 'Confirmada', 'Lista de espera', 'Cancelada'];

  @Output() apply = new EventEmitter<AdminFilterCriteria>();
  @Output() clear = new EventEmitter<void>();

  open = false;
  criteria: AdminFilterCriteria = {};

  toggle(): void {
    this.open = !this.open;
  }

  onApply(): void {
    this.apply.emit({ ...this.criteria });
    this.open = false;
  }

  onClear(): void {
    this.criteria = {};
    this.clear.emit();
  }
}
