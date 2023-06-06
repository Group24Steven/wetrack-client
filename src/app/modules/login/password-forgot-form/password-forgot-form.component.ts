import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthService } from 'src/app/core/services/api/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-password-forgot-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule
  ],
  templateUrl: './password-forgot-form.component.html',
  styleUrls: ['./password-forgot-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordForgotFormComponent {

  @Output() showLoginEvent = new EventEmitter()
  @Output() loadingEvent = new EventEmitter()

  form: FormGroup

  constructor(formBuilder: FormBuilder, private auth: AuthService, private notification: NotificationService) {
    this.form = formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
    })
  }

  get emailControl() {
    return this.form.get('email')
  }

  onSubmit() {
    if (!this.form.valid) return
    this.loadingEvent.emit(true)

    this.auth.forgotPassword(this.emailControl?.value).pipe(
      finalize(() => this.loadingEvent.emit(false))
    ).subscribe({
      next: (response: any) => {
        this.notification.showSuccess(response.data.message)
      },
      error: (error: HttpErrorResponse) => {
        this.notification.showError(error.error.message)
      },
    })
  }
}
