import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { MatIconModule } from '@angular/material/icon';
import { RequestPaginator, RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { Task } from 'src/app/core/models/task';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from 'src/app/core/services/api/task.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TimeTrackerDialogComponent } from '../../dialogs/time-tracker-dialog/time-tracker-dialog.component';
import { TimerService } from 'src/app/core/services/timer.service';
import { TimeRecordType } from '../../../../core/enums/time-record-type';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-task-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatRippleModule, HeadlineTwoComponent, ProgressBarComponent],
  templateUrl: './task-widget.component.html',
  styleUrls: ['./task-widget.component.scss']
})
export class TaskWidgetComponent implements OnInit {
  paginator: RequestPaginator = {
    pageIndex: 0,
    pageSize: 5,
    total: 0,
  }

  tasks?: Task[]

  loading$ = new BehaviorSubject<boolean>(false)

  constructor(private taskService: TaskService, private notificationService: NotificationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks()
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex
    this.loadTasks()
  }

  loadTasks() {
    if (this.loading$.value) return 
    this.loading$.next(true)

    const params: RequestSearchParams = { 'properties': 'id,subject,taskPriority', 'taskStatus-ne': 'COMPLETED', 'sort': 'subject', }

    this.taskService.index(params, this.paginator).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.message)
        return of([])
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: (response: any) => {
        if (!response.data) return
        const data = response.data

        this.tasks = data.data
        this.paginator.total = data.total
      },
    })
  }

  openTimeTrackingDialog(taskId: string) {
    const now = Date.now()

    const dialogRef: MatDialogRef<TimeTrackerDialogComponent> = this.dialog.open(TimeTrackerDialogComponent, {
      width: '400px',
      data: {
        searchType: TimeRecordType.Task,
        taskId: taskId,
        startDateTime: now,
        endDateTime: now
      }
    })
    dialogRef.afterClosed().subscribe(value => {
      if (!value) return 
      // TODO: reload the view
    })
  }
}
