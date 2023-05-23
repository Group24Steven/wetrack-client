import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  hide = true
  form: FormGroup

  @Output() loadingEvent = new EventEmitter<boolean>()
  @Output() successEvent = new EventEmitter()
  @Output() showResetPasswordEvent = new EventEmitter()

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private notification: NotificationService) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get emailControl() {
    return this.form.get('email')
  }

  get passwordControl() {
    return this.form.get('password')
  }

  onSubmit(): void {
    if (!this.form.valid) return

    this.loadingEvent.emit(true)

    this.auth.login(this.emailControl?.value, this.passwordControl?.value).pipe(
      finalize(() => {
        this.loadingEvent.emit(false)
      })
    ).subscribe({
      next: (value) => {
        this.successEvent.emit()
      },
      error: (err: HttpErrorResponse) => {
        this.notification.showError(err.error.message)
      }
    })
  }
}
