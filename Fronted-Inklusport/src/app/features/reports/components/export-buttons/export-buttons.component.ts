import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ExportFormat = 'csv' | 'pdf';

/**
 * M06 - Botones de exportación reutilizables (CSV / PDF).
 * Reemplazan los botones "Exportar CSV/PDF" inertes repartidos por las tablas.
 */
@Component({
  selector: 'app-export-buttons',
  templateUrl: './export-buttons.component.html',
  styleUrl: './export-buttons.component.scss'
})
export class ExportButtonsComponent {
  @Input() formats: ExportFormat[] = ['csv', 'pdf'];
  @Input() disabled = false;
  @Output() export = new EventEmitter<ExportFormat>();
}
