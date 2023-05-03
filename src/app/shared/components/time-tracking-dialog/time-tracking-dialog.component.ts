import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { BehaviorSubject, Observable, finalize } from 'rxjs'
import { Task } from 'src/app/core/models/task'
import { HeadlineTwoComponent } from '../../ui/headline-two/headline-two.component'
import { MatSliderModule } from '@angular/material/slider';
import { ProgressBarComponent } from '../../ui/progress-bar/progress-bar.component'
import { TimeRecordService } from '../../../core/services/api/time-record.service';
import { NotificationService } from '../../../core/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http'

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
    MatSliderModule,
    HeadlineTwoComponent,
    ProgressBarComponent,
  ],
  templateUrl: './time-tracking-dialog.component.html',
  styleUrls: ['./time-tracking-dialog.component.scss']
})
export class TimeTrackingDialogComponent {

  types: any[] = [
    { value: 'TASK', viewValue: 'Task' },
    { value: 'TICKET', viewValue: 'Ticket' },
    { value: 'PROJECT', viewValue: 'Project' },
  ]

  selectedType = this.types[0].value
  sliderValue: number = 1

  timeTrackingForm: FormGroup
  filteredOptions: Observable<Task[]>
  loading$ = new BehaviorSubject<boolean>(false)


  constructor(public dialogRef: MatDialogRef<TimeTrackingDialogComponent>, private fb: FormBuilder, private timeRecordService: TimeRecordService, private notificationService: NotificationService) {

    this.timeTrackingForm = this.fb.group({
      type: ['', Validators.required],
      task: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  ngOnInit(): void { }

  submitTimeTracking(): void {
    this.loading$.next(true);

    this.timeRecordService.store({
    }).pipe(
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe({
      next: () => { },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })

    this.dialogRef.close()
  }
}
