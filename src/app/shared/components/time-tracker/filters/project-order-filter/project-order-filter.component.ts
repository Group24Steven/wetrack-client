import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFilterComponent } from '../base-filter/base-filter.component';
import { List } from 'immutable';
import { Task } from 'src/app/core/models/task';
import { Observable, Subject, catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestSearchParams } from 'src/app/core/services/api/base-api.service';
import { ProjectOrderService } from 'src/app/core/services/api/project-order.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OrderItem, ProjectOrder } from 'src/app/core/models/project-order';

@Component({
  selector: 'app-project-order-filter',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatOptionModule, ReactiveFormsModule],
  templateUrl: './project-order-filter.component.html',
  styleUrls: ['./project-order-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ProjectOrderFilterComponent), multi: true }],
})
export class ProjectOrderFilterComponent extends BaseFilterComponent {
  orderFormControl = new FormControl()
  orderItemFormControl = new FormControl()

  projectOrdersLoaded: Promise<void>

  unsubscribe$ = new Subject<void>()

  // The list of ProjectOrders.
  projectOrders: List<ProjectOrder> = List()

  // An observable for the list of OrderItems.
  orderItems: Observable<List<OrderItem>>

  // An observable for the list of Tasks.
  tasks: Observable<List<Task>>

  selectedOrder: ProjectOrder | null = null
  selectedItem: OrderItem | null = null

  constructor(private apiService: ProjectOrderService, private notificationService: NotificationService) {
    super()
  }

  ngOnInit(): void {
    // Load the ProjectOrders when the component initializes.
    this.projectOrdersLoaded = new Promise(resolve => {
      this.load().subscribe(projectOrders => {
        this.projectOrders = projectOrders
        resolve()
      })
    })

    this.orderItems = this.orderFormControl.valueChanges.pipe(
      tap((orderId: string) => {
        // Find the order with the provided id.
        let foundOrder = this.projectOrders.find(order => order.id === orderId)
        this.selectedOrder = foundOrder !== undefined ? foundOrder : null
      }),
      switchMap(() => {
        // If the order was found, return its orderItems as an observable, otherwise return an empty list.
        return of(this.selectedOrder ? List<OrderItem>(this.selectedOrder.orderItems) : List<OrderItem>())
      })
    )

    this.tasks = this.orderItemFormControl.valueChanges.pipe(
      tap((itemId: string) => {
        // Find the item with the provided id. We need to get items from the selected order.
        let foundItem = this.selectedOrder ? this.selectedOrder.orderItems.find(item => item.id === itemId) : undefined
        this.selectedItem = foundItem !== undefined ? foundItem : null
      }),
      switchMap(() => {
        // If the item was found, return its tasks as an observable, otherwise return an empty list.
        return of(this.selectedItem ? List<Task>(this.selectedItem.tasks) : List<Task>())
      })
    )
  }

  // An overridden method that writes value to a form control
  // This method will resolve when the value is written to the control or when the operation is cancelled due to lack of necessary conditions
  override async writeValue(value: any): Promise<void> {

    // If value is not provided or projectOrders list is not initialized, exit the function
    if (!value || !this.projectOrders) return

    // Wait until the projectOrders are loaded
    await this.projectOrdersLoaded
    
    // Initialize found entities as undefined
    let foundProjectOrder: any
    let foundOrderItem: any
    let foundTask: any

    // Go through each order in the list of projectOrders
    for (let projectOrder of this.projectOrders.toArray()) {
      // Try to find an orderItem in the projectOrder that contains a task with the provided id
      const orderItem = projectOrder.orderItems?.find(item => {
        const task = item.tasks.find(task => task.id === value)
        if (!task) return false

        foundTask = task
        return true
      })

      // If no orderItem found, continue to the next projectOrder
      if (!orderItem) continue
      // If an orderItem is found, set the found entities and break the loop
      foundProjectOrder = projectOrder
      foundOrderItem = orderItem
      break
    }

    // If all entities found, set the form controls
    if (foundProjectOrder && foundOrderItem && foundTask) {
      this.orderFormControl.setValue(foundProjectOrder.id)
      this.orderItemFormControl.setValue(foundOrderItem.id)
      this.formControl.setValue(foundTask.id)
    }
  }

  // Method to load projectOrders
  load(): Observable<List<ProjectOrder>> {
    // Start loading animation
    this.loadingStart.emit()

    // Define request parameters
    const params: RequestSearchParams = {
      properties: 'id,commission,orderNumber,orderItems.id,orderItems.title,orderItems.articleNumber,orderItems.description,orderItems.tasks',
      pageSize: 25,
      includeReferencedEntities: 'orderItems.tasks.id',
      'projectModeActive-eq': true
    }

    // Call the index method of the apiService with the defined parameters
    return this.apiService.index(params).pipe(
      // Map the response to a list of projectOrders. If no data in the response, map to an empty list
      map((response: any) => List<ProjectOrder>(response.data ? response.data.data : [])),
      // Once loading is finished, stop the loading animation
      finalize(() => this.loadingEnd.emit()),
      // Handle potential errors by showing an error notification and returning an observable of an empty list
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of(List<ProjectOrder>())
      })
    )
  }

}
