import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-disabilities',
  templateUrl: './creation-disabilities.component.html',
  styleUrl: './creation-disabilities.component.scss'
})
export class CreationDisabilitiesComponent {
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  cancel(): void {
    this.router.navigate(['/admin/disabilities']);
  }
}
