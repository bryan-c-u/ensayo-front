import { Component, Input } from '@angular/core';

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface RenderedSegment extends DonutSegment {
  dashArray: string;
  dashOffset: number;
  percent: number;
}

/**
 * M06 - Dona SVG data-driven (distribución por categoría).
 * Sustituye al SVG con stroke-dasharray fijos de history-statistics.
 */
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})
export class DonutChartComponent {
  @Input() segments: DonutSegment[] = [];
  @Input() centerValue = '';
  @Input() centerLabel = '';

  readonly radius = 40;

  private get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  private get total(): number {
    return this.segments.reduce((sum, s) => sum + s.value, 0) || 1;
  }

  get rendered(): RenderedSegment[] {
    const c = this.circumference;
    let consumed = 0;
    return this.segments.map(seg => {
      const fraction = seg.value / this.total;
      const length = fraction * c;
      const result: RenderedSegment = {
        ...seg,
        percent: Math.round(fraction * 100),
        dashArray: `${length} ${c - length}`,
        dashOffset: -consumed,
      };
      consumed += length;
      return result;
    });
  }
}
