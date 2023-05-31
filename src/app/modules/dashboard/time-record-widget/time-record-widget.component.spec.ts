import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRecordWidgetComponent } from './time-record-widget.component';

describe('TimerWidgetComponent', () => {
  let component: TimeRecordWidgetComponent;
  let fixture: ComponentFixture<TimeRecordWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TimeRecordWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeRecordWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
