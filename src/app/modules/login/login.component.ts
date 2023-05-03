import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { Router } from '@angular/router'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { BehaviorSubject, finalize } from 'rxjs'
import { AuthService } from 'src/app/core/services/api/auth.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { HttpErrorResponse } from '@angular/common/http'
import { HeadlineComponent } from 'src/app/shared/ui/headline/headline.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule,
    ProgressBarComponent, HeadlineComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  hide = true
  loginForm: FormGroup
  loading$ = new BehaviorSubject<boolean>(false)

  @ViewChild('submitButton') submitButton: MatButton

  get emailControl() {
    return this.loginForm.get('email')
  }

  get passwordControl() {
    return this.loginForm.get('password')
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private notificationService: NotificationService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngAfterViewInit(): void {
    this.submitButton.focus()
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return

    this.loading$.next(true)

    this.authService.login(this.emailControl?.value, this.passwordControl?.value).pipe(
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe({

      next: (value) => {
        this.router.navigate(['/dashboard'])
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.showError(err.error.message)
      }
    })
  }
}
