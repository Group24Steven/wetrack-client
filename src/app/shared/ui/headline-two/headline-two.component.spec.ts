import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineTwoComponent } from './headline-two.component';

describe('SubHeadlineComponent', () => {
  let component: HeadlineTwoComponent;
  let fixture: ComponentFixture<HeadlineTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineTwoComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeadlineTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
