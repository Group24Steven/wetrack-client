import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackingDialogComponent } from './time-tracking-dialog.component';

describe('TimeTrackingDialogComponent', () => {
  let component: TimeTrackingDialogComponent;
  let fixture: ComponentFixture<TimeTrackingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TimeTrackingDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTrackingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
