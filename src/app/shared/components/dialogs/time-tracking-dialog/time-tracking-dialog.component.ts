import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core'
import { MatSelect, MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { BehaviorSubject, catchError, finalize, of } from 'rxjs'
import { MatSliderModule } from '@angular/material/slider';
import { HttpErrorResponse } from '@angular/common/http'
import { List } from 'immutable';
import { TimeRecordType } from 'src/app/core/enums/time-record-type'
import { TimeTrackingService } from 'src/app/core/services/time-tracking.service'
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { NotificationService } from 'src/app/core/services/notification.service'

@Component({
  selector: 'app-time-tracking-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    HeadlineTwoComponent,
    ProgressBarComponent,
  ],
  templateUrl: './time-tracking-dialog.component.html',
  styleUrls: ['./time-tracking-dialog.component.scss']
})
export class TimeTrackingDialogComponent {

  types: any[] = [
    { value: TimeRecordType.Task, viewValue: 'Task' },
    { value: TimeRecordType.Customer, viewValue: 'Customer' },
    { value: TimeRecordType.Ticket, viewValue: 'Ticket' },
    { value: TimeRecordType.Project, viewValue: 'Project' },
  ]

  form: FormGroup
  filteredOptions: List<any>
  loading$ = new BehaviorSubject<boolean>(false)

  get duration(): number {
    return this.form.get('duration')?.value
  }

  get description(): string {
    return this.form.get('description')?.value
  }

  get weclappId(): string {
    return this.form.get('weclappId')?.value
  }

  get type(): TimeRecordType {
    return this.form.get('type')?.value
  }

  constructor(
    public dialogRef: MatDialogRef<TimeTrackingDialogComponent>,
    private fb: FormBuilder,
    private timeTrackingService: TimeTrackingService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      weclappId: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  submitTimeTracking(): void {
    this.loading$.next(true)
    this.timeTrackingService.safe(this.type, this.weclappId, this.description, this.duration).pipe(
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  loadTasks(event: { source: MatSelect, value: TimeRecordType }): void {
    this.loading$.next(true)
    this.timeTrackingService.loadSearchOptions(event.value).pipe(
      finalize(() => this.loading$.next(false)),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of([])
      }),
    ).subscribe({
      next: (res) => {
        this.filteredOptions = res.data
      }
    })
  }
}