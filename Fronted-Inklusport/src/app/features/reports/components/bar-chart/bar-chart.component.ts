import { Component, Input } from '@angular/core';

export interface BarDatum {
  label: string;
  value: number;
  highlight?: 'primary' | 'secondary';
}

/**
 * M06 - Gráfico de barras SVG data-driven.
 * Sustituye al SVG dibujado a mano que vivía en history-statistics.
 */
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  @Input() data: BarDatum[] = [];
  @Input() height = 200;

  readonly barWidth = 30;
  readonly gap = 20;
  readonly baseline = 180;

  get viewBox(): string {
    const width = Math.max(this.data.length * (this.barWidth + this.gap) + this.gap, 320);
    return `0 0 ${width} ${this.height}`;
  }

  private get maxValue(): number {
    return Math.max(...this.data.map(d => d.value), 1);
  }

  barHeight(value: number): number {
    return Math.round((value / this.maxValue) * (this.baseline - 30));
  }

  barX(index: number): number {
    return this.gap + index * (this.barWidth + this.gap);
  }

  barY(value: number): number {
    return this.baseline - this.barHeight(value);
  }

  fill(datum: BarDatum): string {
    if (datum.highlight === 'primary') return '#c8102e';
    if (datum.highlight === 'secondary') return '#2563eb';
    return '#e5e5e5';
  }
}
