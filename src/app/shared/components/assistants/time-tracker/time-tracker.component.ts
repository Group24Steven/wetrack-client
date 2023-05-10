import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeRecordType } from 'src/app/core/enums/time-record-type';
import { BehaviorSubject, Subject, finalize, merge, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../../../core/services/notification.service';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { TimeTrackerAssistantService } from 'src/app/core/services/time-tracker-form.service';
import { CustomerFilterComponent } from './filters/customer-filter/customer-filter.component';
import { ProjectFilterComponent } from './filters/project-filter/project-filter.component';
import { TaskFilterComponent } from './filters/task-filter/task-filter.component';
import { TicketFilterComponent } from './filters/ticket-filter/ticket-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TimeRecordService } from '../../../../core/services/api/time-record.service';

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    ProjectFilterComponent,
    TicketFilterComponent,
    CustomerFilterComponent,
    TaskFilterComponent,
    ProgressBarComponent,
    FormsModule,
  ],
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerTrackerComponent implements OnInit, OnDestroy {
  TimeRecordType = TimeRecordType

  today: Date
  yesterday: Date
  currentTime: string

  selectedSearchType: TimeRecordType

  loading$ = new BehaviorSubject<boolean>(false)
  unsubscribe$ = new Subject<void>()

  @Input() set currentStep(value: number) {
    this.assistantService.currentStep = value
  }

  @Output() successEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(private timeRecordService: TimeRecordService, private notificationService: NotificationService, public assistantService: TimeTrackerAssistantService,) {
    const now = new Date()
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0)
    this.yesterday = new Date(new Date().setDate(now.getDate() - 1))

    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');

    this.currentTime = `${hours}:${minutes}`

    this.assistantService.formStartTime.setValue(this.currentTime)
    this.assistantService.formEndTime.setValue(this.currentTime)
    this.assistantService.formStartDate.setValue(this.today)
  }

  ngOnInit() {
    this.assistantService.formSearchType.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value: any) => {
      this.selectedSearchType = value
    })

    merge(
      this.assistantService.formStartDate.valueChanges,
      this.assistantService.formStartTime.valueChanges,
      this.assistantService.formEndTime.valueChanges
    ).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.assistantService.calculateDuration()
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  submitTimeRecord(): void {
    this.loading$.next(true)

    const data: any = {
      title: this.assistantService.formTitle.value,
      description: this.assistantService.formDescription.value,
      durationSeconds: this.assistantService.durationSeconds,
      startDate: this.assistantService.startTime,
    }

    if (this.assistantService.formSearchType.value === TimeRecordType.Project) {
      data.projectTaskId = this.assistantService.formProjectTaskId.value
    } else {
      data.taskId = this.assistantService.formTaskId.value
    }

    this.timeRecordService.store(data).pipe(
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe({
      next: () => {
        this.assistantService.reset()
        this.successEvent.emit(true)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }
}
