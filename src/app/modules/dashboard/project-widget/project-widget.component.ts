import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { BehaviorSubject, Subscription, catchError, finalize, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimeRecordType } from 'src/app/core/enums/time-record-type';
import { RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { AppEventService } from 'src/app/core/services/app-event.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TimeTrackerDialogComponent } from 'src/app/shared/components/time-tracker/time-tracker-dialog/time-tracker-dialog.component';
import { ProjectOrderService } from 'src/app/core/services/api/project-order.service';
import { ProjectOrder } from 'src/app/core/models/project-order';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';

@Component({
  selector: 'app-project-widget',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatListModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule, 
    MatRippleModule, 
    HeadlineTwoComponent, 
    ProgressBarComponent, 
    TruncatePipe, 
    MatTooltipModule
  ],
  templateUrl: './project-widget.component.html',
  styleUrls: ['./project-widget.component.scss'],

})
export class ProjectWidgetComponent {
  searchTerm = "";
  paginator = signal({
    pageIndex: 0,
    pageSize: 5,
    total: 0
  })

  projects: WritableSignal<ProjectOrder[]> = signal([])

  loading$ = new BehaviorSubject<boolean>(false)
  updateSubscription?: Subscription

  constructor(private projectService: ProjectOrderService, private notificationService: NotificationService, private dialog: MatDialog, private eventService: AppEventService) { }

  ngOnInit(): void {
    this.loadTasks()
    this.updateSubscription = this.eventService.userUpdated$.subscribe(() => this.loadTasks())
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe()
  }

  onSearch(event: any) {
    //this.paginator.pageIndex = 0 (klappt momentan aufgrund Signal nicht...)
    this.searchTerm = event.target.value
    this.loadTasks()
  }

  onPageChange(event: any) {
    this.paginator.mutate((paginator) => {
      paginator.pageIndex = event.pageIndex
    })

    this.loadTasks()
  }

  loadTasks() {
    if (this.loading$.value) return
    this.loading$.next(true)

    const params: RequestSearchParams = {
      properties: 'id,commission,orderNumber',
      pageSize: 25,
      'projectModeActive-eq': true,
      subject: this.searchTerm
    }

    this.projectService.index(params, this.paginator()).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of([])
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: (response: any) => {
        if (!response.data) return
        const data = response.data

        this.projects.set(data.data)

        this.paginator.mutate((paginator) => {
          paginator.total = data.total
        })
      },
    })
  }

  openTimeTrackingDialog(projectId: string) {
    const now = Date.now()

    const dialogRef: MatDialogRef<TimeTrackerDialogComponent> = this.dialog.open(TimeTrackerDialogComponent, {
      width: '400px',
      data: {
        searchType: TimeRecordType.ProjectOrder,
        projectId: projectId,
        startDateTime: now,
        endDateTime: now
      }
    })
    dialogRef.afterClosed().subscribe(value => {
      if (!value) return
      this.eventService.notifyTimeRecordsUpdated()
    })
  }
}
