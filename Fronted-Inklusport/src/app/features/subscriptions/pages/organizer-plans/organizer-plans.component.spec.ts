import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OrganizerPlansComponent } from './organizer-plans.component';
import { OrganizerSidebarComponent } from '../../../../shared/components/organizer-sidebar/organizer-sidebar.component';

describe('OrganizerPlansComponent', () => {
  let component: OrganizerPlansComponent;
  let fixture: ComponentFixture<OrganizerPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, HttpClientTestingModule],
      declarations: [OrganizerPlansComponent, OrganizerSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizerPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
