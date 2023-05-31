import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { MatIconModule } from '@angular/material/icon';
import { RequestPaginator, RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { Task } from 'src/app/core/models/task';
import { BehaviorSubject, Subscription, catchError, finalize, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskService } from 'src/app/core/services/api/task.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { AppEventService } from 'src/app/core/services/app-event.service';
import { TimeRecordType } from 'src/app/core/enums/time-record-type';
import { TimeTrackerDialogComponent } from 'src/app/shared/components/time-tracker/time-tracker-dialog/time-tracker-dialog.component';

@Component({
  selector: 'app-task-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatRippleModule, HeadlineTwoComponent, ProgressBarComponent],
  templateUrl: './task-widget.component.html',
  styleUrls: ['./task-widget.component.scss']
})
export class TaskWidgetComponent implements OnInit, OnDestroy {
  paginator: RequestPaginator = {
    pageIndex: 0,
    pageSize: 5,
    total: 0,
  }

  tasks?: Task[]

  loading$ = new BehaviorSubject<boolean>(false)
  updateSubscription?: Subscription

  constructor(private taskService: TaskService, private notificationService: NotificationService, private dialog: MatDialog, private eventService: AppEventService) { }

  ngOnInit(): void {
    this.loadTasks()
    this.updateSubscription = this.eventService.userUpdated$.subscribe(() => this.loadTasks())
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe()
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
        this.notificationService.showError(error.error.message)
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
