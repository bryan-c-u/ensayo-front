import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

/**
 * M07 - Barra de búsqueda administrativa reutilizable.
 * Emite el término con debounce para no disparar una consulta por tecla.
 */
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Buscar...';
  @Input() debounceMs = 300;
  @Output() search = new EventEmitter<string>();

  term = '';

  private readonly input$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.input$
      .pipe(debounceTime(this.debounceMs), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => this.search.emit(value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInput(value: string): void {
    this.term = value;
    this.input$.next(value.trim());
  }

  clear(): void {
    this.term = '';
    this.search.emit('');
  }
}
