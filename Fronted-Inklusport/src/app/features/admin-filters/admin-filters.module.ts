import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AdvancedFiltersComponent } from './components/advanced-filters/advanced-filters.component';
import { FilterPillsComponent } from './components/filter-pills/filter-pills.component';

/**
 * M07 - Filtros y Búsquedas Administrativas.
 * Módulo de componentes reutilizables (sin rutas propias); lo importan los
 * módulos que tienen tablas administrativas: M03, M05 y M06.
 */
@NgModule({
  declarations: [
    SearchBarComponent,
    AdvancedFiltersComponent,
    FilterPillsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchBarComponent,
    AdvancedFiltersComponent,
    FilterPillsComponent
  ]
})
export class AdminFiltersModule { }
