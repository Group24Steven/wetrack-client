import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TimeRecordType } from 'src/app/core/enums/time-record-type';
import { List } from 'immutable';
import { BehaviorSubject, catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-timer-tracker',
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
    MatAutocompleteModule,],
  templateUrl: './timer-tracker.component.html',
  styleUrls: ['./timer-tracker.component.scss']
})
export class TimerTrackerComponent {

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

  loadTasks(event: { source: MatSelect, value: TimeRecordType }): void {
    /**
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
    */
  }
}
