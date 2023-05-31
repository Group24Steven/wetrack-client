import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackerDialogComponent } from './time-tracker-dialog.component';

describe('TimeTrackerDialogComponent', () => {
  let component: TimeTrackerDialogComponent;
  let fixture: ComponentFixture<TimeTrackerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TimeTrackerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTrackerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
