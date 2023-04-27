import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatCardModule,
    ProgressBarComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit{

  hide = true
  loading = false
  loginForm: FormGroup

  @ViewChild('submitButton') submitButton: MatButton

  get email() {
    return this.loginForm.get('email')?.value
  }

  get password() {
    return this.loginForm.get('password')?.value
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngAfterViewInit(): void {
    console.log(this.submitButton)
    this.submitButton.focus()
  }

  onSubmit(): void {  
    if (!this.loginForm.valid) return
    this.loading = true

    this.authService.login(this.email, this.password).subscribe(() => {
      this.loading = false
    
      this.router.navigate(['/dashboard'])
    });
  }
}
