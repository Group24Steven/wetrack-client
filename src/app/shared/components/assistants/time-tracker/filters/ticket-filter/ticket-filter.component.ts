import { Component, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaseFilterComponent } from '../base-filter/base-filter.component'
import { ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, Subject, switchMap, map, finalize, catchError, of } from 'rxjs'
import { Task } from 'src/app/core/models/task'
import { Ticket } from 'src/app/core/models/ticket'
import { RequestSearchParams } from 'src/app/core/services/api/base-api.service'
import { NotificationService } from 'src/app/core/services/notification.service'
import { List } from 'immutable'
import { TicketService } from 'src/app/core/services/api/ticket.service'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-ticket-filter',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatOptionModule, ReactiveFormsModule],
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TicketFilterComponent), multi: true }],
})
export class TicketFilterComponent extends BaseFilterComponent {
  prefilterFormControl = new FormControl()

  tickets: List<Ticket> = List()
  customersLoaded: Promise<void>

  unsubscribe$ = new Subject<void>()

  tasks: Observable<List<Task>>

  constructor(private ticketService: TicketService, private notificationService: NotificationService) {
    super()
  }

  ngOnInit(): void {
    this.customersLoaded = new Promise(resolve => {
      this.load().subscribe(tickets => {
        this.tickets = tickets
        resolve()
      })
    })
    this.tasks = this.prefilterFormControl.valueChanges.pipe(switchMap((ticketId: string) => {
      const ticket = this.tickets.find(ticket => ticket.id === ticketId)
      return of(ticket ? List<Task>(ticket.tasks) : List<Task>())
    }))
  }

  override async writeValue(value: any): Promise<void> {
    if (!value || !this.tickets) return

    await this.customersLoaded

    for (const ticket of this.tickets.toArray()) {
      const task = ticket.tasks?.find(task => task.id === value)
      if (!task) continue
      this.prefilterFormControl.setValue(ticket.id)
      this.formControl.setValue(task.id)
      break
    }
  }

  load(): Observable<List<Ticket>> {
    this.laodingStart.emit()
    const params: RequestSearchParams = { properties: 'id,subject,ticketId', pageSize: 25, includeReferencedEntities: 'ticketId', }

    return this.ticketService.index(params).pipe(
      map((response: any) => List<Ticket>(response.data ? response.data.data : [])),
      finalize(() => this.loadingEnd.emit()),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of(List<Ticket>())
      })
    )
  }
}

