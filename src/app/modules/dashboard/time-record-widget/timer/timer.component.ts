import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TimerService } from 'src/app/core/services/timer.service';
import { TimeTrackerDialogComponent } from 'src/app/shared/components/dialogs/time-tracker-dialog/time-tracker-dialog.component';
import { DurationWithSecondsPipe } from 'src/app/shared/pipes/duration-with-seconds.pipe';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  imports: [CommonModule, MatIconModule, MatButtonModule, DurationWithSecondsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit {

  timer$: Observable<number>
  timerRunning$: Observable<boolean>

  @Output() reloadEvent = new EventEmitter<boolean>()

  constructor(public timerService: TimerService, private notifications: NotificationService, private dialog: MatDialog) {

    this.timer$ = this.timerService.getTime()
    this.timerRunning$ = this.timerService.timerRunning$
  }

  ngOnInit(): void {
    this.timer$ = this.timerService.getTime()
    this.timerRunning$ = this.timerService.timerRunning$
  }

  stop() {
    this.timerService.stop().subscribe({
      next: () => {
        this.openTimeTrackingDialog()
      },
      error: (error: HttpErrorResponse) => {
        this.notifications.showError(error.error.message)
      }
    })
  }

  start() {
    this.timerService.start().subscribe({
      next: () => {
        this.notifications.showSuccess('response.success.timer.started')
      },
      error: (error: HttpErrorResponse) => {
        this.notifications.showError(error.error.message)
      }
    })
  }

  delete() {
    this.timerService.delete().subscribe({
      next: () => {
        this.notifications.showSuccess('response.success.timer.deleted')
      },
      error: (error: HttpErrorResponse) => {
        this.notifications.showError(error.error.message)
      }
    })
  }

  openTimeTrackingDialog() {
    const dialogRef: MatDialogRef<TimeTrackerDialogComponent> = this.dialog.open(TimeTrackerDialogComponent, {
      width: '400px', data: {
        startDateTime: new Date(this.timerService.startTime!),
        endDateTime: new Date(this.timerService.endTime!)
      }
    })
    dialogRef.afterClosed().subscribe(value => {
      if (!value) return 
      this.delete()
      this.reloadEvent.emit(true) 
    })
  }
}
