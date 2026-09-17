import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EstadoSuscripcionComponent } from './estado-suscripcion.component';
import { OrganizerSidebarComponent } from '../../../../shared/components/organizer-sidebar/organizer-sidebar.component';

describe('EstadoSuscripcionComponent', () => {
  let component: EstadoSuscripcionComponent;
  let fixture: ComponentFixture<EstadoSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, HttpClientTestingModule],
      declarations: [EstadoSuscripcionComponent, OrganizerSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadoSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
