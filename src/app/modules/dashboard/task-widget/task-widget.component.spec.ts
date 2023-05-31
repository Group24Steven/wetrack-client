import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskWidgetComponent } from './task-widget.component';

describe('TaskWidgetComponent', () => {
  let component: TaskWidgetComponent;
  let fixture: ComponentFixture<TaskWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TaskWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
