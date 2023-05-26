import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { BehaviorSubject } from 'rxjs'
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component'
import { LoginFormComponent } from './login-form/login-form.component'
import { PasswordForgotFormComponent } from './password-forgot-form/password-forgot-form.component'
import { WetrackHeadlineComponent } from 'src/app/shared/ui/wetrack-headline/wetrack-headline.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent, HeadlineTwoComponent, LoginFormComponent, PasswordForgotFormComponent, WetrackHeadlineComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  ressetingPassword = false

  loading$ = new BehaviorSubject<boolean>(false)

  constructor(private router: Router) {
  }

  handleLoginEvent() {
    this.router.navigate(['/dashboard'])
  }

  handleLoadingEvent(event: boolean) {
    this.loading$.next(event)
  }
}
