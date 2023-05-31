import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOrderFilterComponent } from './project-order-filter.component';

describe('ProjectFilterComponent', () => {
  let component: ProjectOrderFilterComponent;
  let fixture: ComponentFixture<ProjectOrderFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProjectOrderFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOrderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
