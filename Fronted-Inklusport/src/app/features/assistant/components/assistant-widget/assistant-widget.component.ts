import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * M08 - Tarjeta "Asistente Virtual" reutilizable.
 * Reemplaza las tarjetas de IA duplicadas con botones alert() en el dashboard
 * del atleta (M02) y en el calendario de eventos (M03).
 */
@Component({
  selector: 'app-assistant-widget',
  templateUrl: './assistant-widget.component.html',
  styleUrl: './assistant-widget.component.scss'
})
export class AssistantWidgetComponent {
  @Input() title = 'Asistente Virtual';
  @Input() message = 'Tengo una recomendación para tu próxima sesión.';
  @Input() ctaLabel = 'Hablar con IA';

  constructor(private readonly router: Router) {}

  openAssistant(): void {
    this.router.navigate(['/assistant']);
  }
}
