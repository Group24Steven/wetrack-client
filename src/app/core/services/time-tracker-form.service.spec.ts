import { TestBed } from '@angular/core/testing';

import { TimeTrackerAssistantService } from './time-tracker-form.service';

describe('TimeTrackerService', () => {
  let service: TimeTrackerAssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTrackerAssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
