import { Component } from '@angular/core';

@Component({
  selector: 'app-history-statistics',
  templateUrl: './history-statistics.component.html',
  styleUrl: './history-statistics.component.scss'
})
export class HistoryStatisticsComponent {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
