import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WetrackHeadlineComponent } from './wetrack-headline.component';

describe('WetrackHeadlineComponent', () => {
  let component: WetrackHeadlineComponent;
  let fixture: ComponentFixture<WetrackHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WetrackHeadlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WetrackHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
