import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeRecordType } from 'src/app/core/enums/time-record-type';
import { BehaviorSubject, Subject, finalize, map, merge, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { TimeTrackerAssistantService } from 'src/app/core/services/time-tracker-form.service';
import { CustomerFilterComponent } from './filters/customer-filter/customer-filter.component';
import { ProjectOrderFilterComponent } from './filters/project-order-filter/project-order-filter.component';
import { TaskFilterComponent } from './filters/task-filter/task-filter.component';
import { TicketFilterComponent } from './filters/ticket-filter/ticket-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TimeRecordService } from 'src/app/core/services/api/time-record.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TimeRecord } from '../../../core/models/time-record';
import { TimeRecordConfig } from 'src/app/core/interfaces/time-record-config';
import { Task } from 'src/app/core/models/task';

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
    ProjectOrderFilterComponent,
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

  id: WritableSignal<string | null> = signal(null)
  projectId: WritableSignal<string | null> = signal(null)

  today: Date
  yesterday: Date

  selectedSearchType: TimeRecordType

  loading$ = new BehaviorSubject<boolean>(false)
  unsubscribe$ = new Subject<void>()

  @Input({ required: true }) set config(value: TimeRecordConfig) {
    if (value.id) {
      this.id.set(value.id)
      this.getData(value.id)
      return
    }

    this.assistantService.form.reset()

    this.startTime = value.startDateTime
    this.endTime = value.endDateTime

    if (value.searchType) this.assistantService.formSearchType.setValue(value.searchType)
    if (value.task) this.assistantService.formTask.setValue(value.task)

    this.projectId.set(value.projectId)
  }

  set startTime(value: number) {
    const date = new Date(value)
    const timeInput = TimeRecord.getTimeInput(date)
    this.assistantService.formStartTime.setValue(timeInput)
  }

  set endTime(value: number) {
    const date = new Date(value)
    const timeInput = TimeRecord.getTimeInput(date)
    this.assistantService.formEndTime.setValue(timeInput)
  }

  @Output() successEvent: EventEmitter<boolean> = new EventEmitter()

  constructor(private timeRecordService: TimeRecordService, private notificationService: NotificationService, public assistantService: TimeTrackerAssistantService,) {
    this.assistantService.reset()

    this.assistantService.formSearchType.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value: any) => {
      this.selectedSearchType = value
    })

    merge(
      this.assistantService.formStartDate.valueChanges,
      this.assistantService.formStartTime.valueChanges,
      this.assistantService.formEndTime.valueChanges
    ).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.assistantService.calculateDuration()
    })
  }

  ngOnInit() {
    const now = new Date()
    this.today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0)
    this.yesterday = new Date(new Date().setDate(now.getDate() - 1))
    this.assistantService.formStartDate.setValue(this.today)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  submitTimeRecord(): void {
    if (this.id() === null) {
      this.create()
    } else {
      this.update(this.id() as string)
    }
  }

  private create(): void {
    this.loading$.next(true)

    const task: Task = this.assistantService.formTask.value
    const data: any = {
      title: this.assistantService.formDescription.value,
      description: this.assistantService.formDescription.value,
      durationSeconds: this.assistantService.durationSeconds,
      startDate: this.assistantService.startTime,
      taskId: task.id
    }

    this.timeRecordService.store(data).pipe(
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('Arbeitszeit wurder erfolgreich erfasst.')
        this.successEvent.emit(true)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  private update(id: string): void {
    this.loading$.next(true)

    const task: Task = this.assistantService.formTask.value

    const data: any = {
      title: this.assistantService.formDescription.value,
      description: this.assistantService.formDescription.value,
      durationSeconds: this.assistantService.durationSeconds,
      startDate: this.assistantService.startTime,
      taskId: task.id,
      userId: this.assistantService.form.get('userId')!.value,
    }

    this.timeRecordService.update(id, data).pipe(
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('Arbeitszeit wurder erfolgreich bearbeitet.')
        this.successEvent.emit(true)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  private getData(id: string): void {
    this.loading$.next(true)

    this.timeRecordService.show(id).pipe(
      map((response: any) => {
        return new TimeRecord(response.data)
      }),
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe({
      next: (data: TimeRecord) => {
        this.assistantService.currentStep = 3
        this.assistantService.form.patchValue(data)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }
}
