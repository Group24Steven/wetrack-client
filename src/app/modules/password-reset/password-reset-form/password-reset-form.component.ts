import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-password-reset-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule,
  ],
  templateUrl: './password-reset-form.component.html',
  styleUrls: ['./password-reset-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordResetFormComponent {
  hide = true
  form: FormGroup

  @Output() loadingEvent = new EventEmitter<boolean>()
  @Output() successEvent = new EventEmitter()
  @Output() showResetPasswordEvent = new EventEmitter()

  @Input() set email(value: string) {
    if (!this.emailControl) return
    this.emailControl.setValue(value)
    this.emailControl.disable()
  }

  @Input() token: any | null = null

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

    const email = this.emailControl!.value
    const password = this.passwordControl!.value

    this.auth.resetPassword(email, password, this.token).pipe(
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
