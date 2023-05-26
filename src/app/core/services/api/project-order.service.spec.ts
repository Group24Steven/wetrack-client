import { TestBed } from '@angular/core/testing';

import { ProjectOrderService } from './project-order.service';

describe('ProjectOrderService', () => {
  let service: ProjectOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
