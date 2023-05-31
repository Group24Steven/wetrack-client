import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchTenantDialogComponent } from './switch-tenant-dialog.component';

describe('SwitchTenantDialogComponent', () => {
  let component: SwitchTenantDialogComponent;
  let fixture: ComponentFixture<SwitchTenantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SwitchTenantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchTenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
