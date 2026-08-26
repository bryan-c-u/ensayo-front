import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EventManagementComponent } from './event-management.component';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';

describe('EventManagementComponent', () => {
  let component: EventManagementComponent;
  let fixture: ComponentFixture<EventManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EventManagementComponent, AdminSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
