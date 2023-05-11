import { TestBed } from '@angular/core/testing';

import { TimerCmdService } from './timer-cmd.service';

describe('TimerCmdService', () => {
  let service: TimerCmdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimerCmdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
