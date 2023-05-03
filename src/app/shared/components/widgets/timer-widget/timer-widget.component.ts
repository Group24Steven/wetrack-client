import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { TimeRecord } from 'src/app/core/models/time-record';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { TimeTrackingDialogComponent } from 'src/app/shared/components/time-tracking-dialog/time-tracking-dialog.component';
import { NotificationService } from 'src/app/core/services/notification.service';

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
    DurationPipe
  ],
  templateUrl: './timer-widget.component.html',
  styleUrls: ['./timer-widget.component.scss']
})
export class TimerWidgetComponent implements OnInit {

  timeRecords?: TimeRecord[]
  todaySeconds = 0;
  today: Date = new Date()

  pageSize = 5
  pageIndex = 0

  loading$ = new BehaviorSubject<boolean>(false)

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private timeRecordService: TimeRecordService, private notificationService: NotificationService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadTimeRecords()
  }

  openTimeTrackingDialog() {
    const dialogRef: MatDialogRef<TimeTrackingDialogComponent> = this.dialog.open(TimeTrackingDialogComponent, { width: '400px' })
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadTimeRecords();
  }

  private loadTimeRecords() {
    this.loading$.next(true)
    this.timeRecordService.index().pipe(
      catchError(() => of([])),
      finalize(() => {
        this.loading$.next(false)
      }),
    ).subscribe({
      next: (response: any) => {
        if (!response.data) return
        this.timeRecords = response.data.data
        this.todaySeconds = response.data.totalDuration
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    });
  }
}
