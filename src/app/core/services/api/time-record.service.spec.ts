import { TestBed } from '@angular/core/testing';

import { TimeRecordService } from './time-record.service';

describe('TimeRecordService', () => {
  let service: TimeRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
