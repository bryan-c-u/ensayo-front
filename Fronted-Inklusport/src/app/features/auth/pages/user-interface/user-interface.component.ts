import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrl: './user-interface.component.scss'
})
export class UserInterfaceComponent {
  constructor(private router: Router) {}

  onNotifications(): void {
    this.router.navigate(['/accessibility/notifications']);
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
