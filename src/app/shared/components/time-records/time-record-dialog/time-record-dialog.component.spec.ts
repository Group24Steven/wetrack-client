import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRecordDialogComponent } from './time-record-dialog.component';

describe('TimeRecordDialogComponent', () => {
  let component: TimeRecordDialogComponent;
  let fixture: ComponentFixture<TimeRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TimeRecordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
