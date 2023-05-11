import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TimerService } from '../../../core/services/timer.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { DurationWithSecondsPipe } from '../../pipes/duration-with-seconds.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../core/services/notification.service';


@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  imports: [CommonModule, MatIconModule, MatButtonModule, DurationWithSecondsPipe]
})
export class TimerComponent {

  timer$: Observable<number>
  timerRunning$: Observable<boolean>

  constructor(public timerService: TimerService, private notifications: NotificationService) { 
    this.timer$ = this.timerService.getTime()
    this.timerRunning$ = this.timerService.timerRunning$
  }

  ngOnInit(): void {
    
  }

  stop() {
    this.timerService.stop().subscribe({
      next: () => {
        this.notifications.showSuccess('response.success.timer-stoped')
      },
      error: (error: HttpErrorResponse) => {
        this.notifications.showError(error.error.message)
      }
    })
  }

  start() {
    this.timerService.start().subscribe({
      next: () => {
        this.notifications.showSuccess('response.success.timer-started')
      },
      error: (error: HttpErrorResponse) => {
        this.notifications.showError(error.error.message)
      }
    })
  }

  delete() {
    this.timerService.delete().subscribe({
      next: () => {
        this.notifications.showSuccess('response.success.timer-deleted')
      },
      error: (error: HttpErrorResponse) => {
        this.notifications.showError(error.error.message)
      }
    })
  }
}
