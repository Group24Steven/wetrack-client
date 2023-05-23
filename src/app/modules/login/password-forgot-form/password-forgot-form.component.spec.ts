import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordForgotFormComponent } from './password-forgot-form.component';

describe('ForgotPasswordFormComponent', () => {
  let component: PasswordForgotFormComponent;
  let fixture: ComponentFixture<PasswordForgotFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PasswordForgotFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordForgotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
