import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { TimeRecordService } from 'src/app/core/services/api/time-record.service';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { RequestPaginator, RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { WorkPercentPipe } from 'src/app/shared/pipes/work-percent.pipe';
import { TimeRecord } from 'src/app/core/models/time-record';
import { TimeTrackerDialogComponent } from '../../dialogs/time-tracker-dialog/time-tracker-dialog.component';
import { TimerComponent } from './timer/timer.component';
import { ToggleButtonComponent } from 'src/app/shared/ui/toggle-button/toggle-button.component';
import { MatDividerModule } from '@angular/material/divider';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-timer-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatRippleModule,
    HeadlineTwoComponent,
    ProgressBarComponent,
    DurationPipe,
    WorkPercentPipe,
    TruncatePipe,
    TimerComponent,
    ToggleButtonComponent,
  ],
  templateUrl: './time-record-widget.component.html',
  styleUrls: ['./time-record-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeRecordWidgetComponent implements OnInit {

  paginator: RequestPaginator = {
    pageIndex: 0,
    pageSize: 5,
    total: 0,
  }

  today: Date
  timeRecords?: TimeRecord[]

  activeView = 1
  todaySeconds = 0

  loading$ = new BehaviorSubject<boolean>(false)

  constructor(private timeRecordService: TimeRecordService, private notificationService: NotificationService, private dialog: MatDialog) {
    const now = new Date()
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 1)
  }

  ngOnInit(): void {
    this.loadTimeRecords()
  }

  openTimeTrackingDialog() {
    const now = new Date()
    const dialogRef: MatDialogRef<TimeTrackerDialogComponent> = this.dialog.open(TimeTrackerDialogComponent, {
      width: '400px', data: {
        startDateTime: now,
        endDateTime: now
      }
    })
    dialogRef.afterClosed().subscribe(value => value ? this.loadTimeRecords() : false)
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex
    this.loadTimeRecords()
  }

  loadTimeRecords() {
    if (this.loading$.value) return

    this.loading$.next(true)

    const params: RequestSearchParams = {
      'startDate-gt': this.today.getTime(),
      'properties': 'id,durationSeconds,description,projectId,projectTaskId,taskId,ticketId,startDate,lastModifiedDate',
      'includeReferencedEntities': 'projectId,projectTaskId,taskId,ticketId',
      'sort': '-startDate'
    }

    this.timeRecordService.index(params, this.paginator).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of([])
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: (response: any) => {
        if (!response.data) return
        const data = response.data

        this.timeRecords = data.data
        this.paginator.total = data.total
        this.todaySeconds = data.adds.totalDuration
      }
    })
  }
}
