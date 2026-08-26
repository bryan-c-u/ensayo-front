import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateEventsComponent } from './create-events.component';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';

describe('CreateEventsComponent', () => {
  let component: CreateEventsComponent;
  let fixture: ComponentFixture<CreateEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CreateEventsComponent, AdminSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
