import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RoleManagementComponent } from './role-management.component';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';

describe('RoleManagementComponent', () => {
  let component: RoleManagementComponent;
  let fixture: ComponentFixture<RoleManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RoleManagementComponent, AdminSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
