import { Component, OnInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { List } from 'immutable';
import { catchError, debounceTime, finalize, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { BaseFilterComponent } from '../base-filter/base-filter.component';
import { TaskService } from 'src/app/core/services/api/task.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, FormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TaskFilterComponent), multi: true }],
})
export class TaskFilterComponent extends BaseFilterComponent implements OnInit {

  filteredOptions: Observable<List<Task>>
  tasksLoaded: Promise<void>

  constructor(private taskService: TaskService, private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.tasksLoaded = new Promise(resolve => {
      this.filteredOptions = this.formControl.valueChanges.pipe(startWith(''), debounceTime(300),
        switchMap(value => {
          return this.blockSearch ? of([]) : this.load(value)
        })
      )
    })
  }

  load(searchText?: string): Observable<any> {
    this.loadingStart.emit();

    const params: RequestSearchParams = { 'properties': 'id,subject,taskPriority', 'taskStatus-ne': 'COMPLETED', 'sort': 'subject', }
    if (searchText) params['subject-ilike'] = `%${searchText}%`

    return this.taskService.index(params).pipe(
      map((response: any) => response.data ? response.data.data : []),
      finalize(() => this.loadingEnd.emit()),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of([])
      })
    )
  }

  displayFn(task: Task): string {
    return task ? `${task.id} - ${task.subject}` : ''
  }
}
