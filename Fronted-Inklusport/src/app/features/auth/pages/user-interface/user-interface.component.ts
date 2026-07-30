import { Component } from '@angular/core';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.scss'
})
export class UserInterfaceComponent {
  onNotifications(): void {
    alert('Sin notificaciones nuevas');
  }

  onSeeAllEvents(): void {
    alert('Ver todos los eventos');
  }

  onRegisterEvent(): void {
    alert('¡Inscripción simulada con éxito!');
  }

  onTalkToAi(): void {
    alert('Abriendo chat con Asistente IA...');
  }
}
