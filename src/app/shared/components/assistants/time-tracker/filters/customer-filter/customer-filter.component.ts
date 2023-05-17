import { Component, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BaseFilterComponent } from '../base-filter/base-filter.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatOptionModule } from '@angular/material/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import { CustomerService } from 'src/app/core/services/api/customer.service'
import { NotificationService } from '../../../../../../core/services/notification.service'
import { Customer } from 'src/app/core/models/customer'
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, of, map, finalize, catchError, switchMap, Subject } from 'rxjs'
import { RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { List } from 'immutable'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { Task } from 'src/app/core/models/task'

@Component({
  selector: 'app-customer-filter',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatOptionModule, ReactiveFormsModule],
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomerFilterComponent), multi: true }],
})
export class CustomerFilterComponent extends BaseFilterComponent {
  prefilterFormControl = new FormControl()

  customers: List<Customer> = List()
  customersLoaded: Promise<void>

  unsubscribe$ = new Subject<void>()

  tasks: Observable<List<Task>>

  constructor(private customerService: CustomerService, private notificationService: NotificationService) {
    super()
  }

  ngOnInit(): void {
    this.customersLoaded = new Promise(resolve => {
      this.load().subscribe(customers => {
        this.customers = customers
        resolve()
      })
    })

    this.tasks = this.prefilterFormControl.valueChanges.pipe(switchMap((customerId: string) => {
      const customer = this.customers.find(customer => customer.id === customerId)
      return of(customer ? List<Task>(customer.tasks) : List<Task>())
    }))
  }

  override async writeValue(value: any): Promise<void> {
    if (!value || !this.customers) return

    await this.customersLoaded

    for (let customer of this.customers.toArray()) {
      const task = customer.tasks?.find(task => task.id === value)
      if (!task) continue
      this.prefilterFormControl.setValue(customer.id)
      this.formControl.setValue(task.id)
      break
    }
  }

  load(): Observable<List<Customer>> {
    this.laodingStart.emit()
    const params: RequestSearchParams = { properties: 'id,subject,customerId', pageSize: 25, includeReferencedEntities: 'customerId', }

    return this.customerService.index(params).pipe(
      map((response: any) => List<Customer>(response.data ? response.data.data : [])),
      finalize(() => this.loadingEnd.emit()),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.message)
        return of(List<Customer>())
      })
    )
  }
}
