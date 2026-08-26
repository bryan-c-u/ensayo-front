import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HistoryStatisticsComponent } from './history-statistics.component';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';

describe('HistoryStatisticsComponent', () => {
  let component: HistoryStatisticsComponent;
  let fixture: ComponentFixture<HistoryStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HistoryStatisticsComponent, AdminSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
