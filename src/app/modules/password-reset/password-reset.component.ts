import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { BehaviorSubject } from 'rxjs';
import { PasswordResetFormComponent } from './password-reset-form/password-reset-form.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [CommonModule,ProgressBarComponent, HeadlineTwoComponent, PasswordResetFormComponent],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  loading$ = new BehaviorSubject<boolean>(false)

  token: string | null = null
  email: string | null = null

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.token = params['token']
    })

    this.route.queryParams.subscribe(params => {
      this.email = params['email']
    })
  }

  handleLoadingEvent(event: boolean) {
    this.loading$.next(event)
  }

  handleSuccessEvent() {
    this.router.navigate(['/dashboard'])
  }
}
