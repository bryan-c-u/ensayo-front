import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SportsManagementComponent } from './sports-management.component';
import { AdminSidebarComponent } from '../../../../shared/components/admin-sidebar/admin-sidebar.component';

describe('SportsManagementComponent', () => {
  let component: SportsManagementComponent;
  let fixture: ComponentFixture<SportsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SportsManagementComponent, AdminSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
