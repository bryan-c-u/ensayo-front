import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface FilterPill {
  id: string;
  label: string;
}

/**
 * M07 - Chips de filtro rápido (p. ej. Todos / Activos / Por rol).
 */
@Component({
  selector: 'app-filter-pills',
  templateUrl: './filter-pills.component.html',
  styleUrl: './filter-pills.component.scss'
})
export class FilterPillsComponent {
  @Input() pills: FilterPill[] = [];
  @Input() activeId = '';
  @Output() select = new EventEmitter<string>();

  onSelect(id: string): void {
    this.activeId = id;
    this.select.emit(id);
  }
}
