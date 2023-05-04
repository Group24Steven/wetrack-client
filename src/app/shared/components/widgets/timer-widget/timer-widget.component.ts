import { Component, OnInit } from '@angular/core';
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
import { TimeTrackingDialogComponent } from '../../dialogs/time-tracking-dialog/time-tracking-dialog.component';
import { RequestPaginator, RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { WorkPercentPipe } from 'src/app/shared/pipes/work-percent.pipe';
import { TimeRecord } from 'src/app/core/models/time-record';

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
    HeadlineTwoComponent,
    ProgressBarComponent,
    TimeTrackingDialogComponent,
    DurationPipe,
    WorkPercentPipe
  ],
  templateUrl: './timer-widget.component.html',
  styleUrls: ['./timer-widget.component.scss']
})
export class TimerWidgetComponent implements OnInit {

  paginator: RequestPaginator = {
    pageIndex: 0,
    pageSize: 5,
    total: 0,
  }

  todaySeconds: number = 0
  today: Date

  timeRecords?: TimeRecord[]
  loading$ = new BehaviorSubject<boolean>(false)

  constructor(private timeRecordService: TimeRecordService, private notificationService: NotificationService, private dialog: MatDialog) {
    const now = new Date()
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 1)
  }

  ngOnInit(): void {
    this.loadTimeRecords()
  }

  openTimeTrackingDialog() {
    const dialogRef: MatDialogRef<TimeTrackingDialogComponent> = this.dialog.open(TimeTrackingDialogComponent, { width: '400px' })

    dialogRef.afterClosed().subscribe(value => value ? this.loadTimeRecords() : false)
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex
    this.loadTimeRecords()
  }

  private loadTimeRecords() {
    this.loading$.next(true)

    const params: RequestSearchParams = {
      'startDate-gt': this.today.getTime(),
      'properties': 'id,durationSeconds,description,userId,projectId,projectTaskId,taskId,ticketId,startDate,createdDate,lastModifiedDate',
      'includeReferencedEntities': 'projectId,projectTaskId,taskId,ticketId',
      'sort': '-startDate'
    }

    this.timeRecordService.index(params, this.paginator).pipe(
      catchError(() => of([])),
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: (response: any) => {
        if (!response.data) return
        const data = response.data

        this.timeRecords = data.data
        this.paginator.total = data.total
        this.todaySeconds = data.adds.totalDuration
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }
}
