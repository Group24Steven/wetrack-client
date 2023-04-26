import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeadlineComponent } from './sub-headline.component';

describe('SubHeadlineComponent', () => {
  let component: SubHeadlineComponent;
  let fixture: ComponentFixture<SubHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SubHeadlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
