import { TestBed } from '@angular/core/testing';

import { SportsAndEventsService } from './sports-and-events.service';

describe('SportsAndEventsService', () => {
  let service: SportsAndEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsAndEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
