import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BehaviorSubject, Subscription, catchError, debounceTime, distinctUntilChanged, finalize, map, of, tap } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { HeadlineComponent } from 'src/app/shared/ui/headline/headline.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { NotificationService } from '../../core/services/notification.service'
import { HttpErrorResponse } from '@angular/common/http'
import { MatRippleModule } from '@angular/material/core'
import { MatDividerModule } from '@angular/material/divider'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { RequestPaginator, RequestSearchParams } from 'src/app/core/services/api/base-api.service'
import { AppEventService } from 'src/app/core/services/app-event.service'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TaskService } from 'src/app/core/services/api/task.service'
import { ProjectOrderService } from 'src/app/core/services/api/project-order.service'
import { Task } from 'src/app/core/models/task'
import { OrderItem } from 'src/app/core/models/project-order'
import { TasksPageTable } from 'src/app/core/enums/tasks-page-table'
import { __values } from 'tslib'
import { FormControl } from '@angular/forms'


@Component({
    selector: 'app-tasks',
    standalone: true,
    imports: [
      CommonModule, 
      MatTableModule, 
      MatPaginatorModule, 
      MatDividerModule, 
      MatButtonModule, 
      MatRippleModule, 
      MatIconModule, 
      MatFormFieldModule, 
      MatInputModule, 
      MatCardModule, 
      HeadlineComponent, 
      MatDialogModule, 
      ProgressBarComponent, 
      MatTooltipModule
    ],
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksComponent implements OnInit, OnDestroy {
  searchTerm = '';
  taskSearchCtrl = new FormControl();
  taskSearchSubscription: Subscription;
  taskColumns: string[] = ['id', 'subject', 'taskPriority']
  tasksDataSource = new MatTableDataSource<Task>()
  tasksLoading$ = new BehaviorSubject<boolean>(false)

  orderSearchCtrl = new FormControl();
  orderSearchSubscription: Subscription;
  orderColumns: string[] = ['id', 'commission', 'orderNumber']
  ordersDataSource = new MatTableDataSource<OrderItem>()
  ordersLoading$ = new BehaviorSubject<boolean>(false)

  taskPaginator: RequestPaginator = {
    pageIndex: 0,
    pageSize: 15,
    total: 0
  }
  orderPaginator: RequestPaginator = {
    pageIndex: 0,
    pageSize: 15,
    total: 0
  }
  currentTable: TasksPageTable

  constructor(private taskService: TaskService, private orderService: ProjectOrderService, private dialog: MatDialog, private notificationService: NotificationService, private eventService: AppEventService) {
    this.taskService = taskService;
    this.orderService = orderService;
  }

  ngOnInit(): void {
    this.loadData(TasksPageTable.TASKS)
    this.loadData(TasksPageTable.ORDERS)
    this.taskSearchSubscription = this.taskSearchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => { 
        this.loadData(TasksPageTable.TASKS)
      })
    this.orderSearchSubscription = this.orderSearchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => { 
        this.loadData(TasksPageTable.ORDERS)
      })
  }

  ngOnDestroy(): void {
    if(this.taskSearchSubscription) this.taskSearchSubscription.unsubscribe();
    if(this.orderSearchSubscription) this.orderSearchSubscription.unsubscribe();
  }

  onSearch(event: any, table: TasksPageTable) {
    switch(table) {
      case TasksPageTable.TASKS:
        this.taskPaginator.pageIndex = 0
        this.searchTerm = event.target.value
        this.loadData(TasksPageTable.TASKS)
        break;
      case TasksPageTable.ORDERS:
        this.orderPaginator.pageIndex = 0
        this.searchTerm = event.target.value
        this.loadData(TasksPageTable.ORDERS)
        break;
    }
  }

  onPageChange(event: any, table: TasksPageTable) {
    switch(table) {
      case TasksPageTable.TASKS: //TasksPageTable.TASKS
        this.taskPaginator.pageIndex = event.pageIndex
        this.loadData(TasksPageTable.TASKS)
        break;
      case TasksPageTable.ORDERS: //TasksPageTable.ORDERS
        this.orderPaginator.pageIndex = event.pageIndex
        this.loadData(TasksPageTable.ORDERS)
        break;
    }
  }
  
  private loadData(table: TasksPageTable): void {
    switch(table) {
      case TasksPageTable.TASKS:
        const taskParams: RequestSearchParams = {
          pageIndex: this.taskPaginator.pageIndex
        }
        this.tasksLoading$.next(true);
        this.taskService.index(taskParams, this.taskPaginator, this.searchTerm).pipe(
          tap((response: any) => {
            this.taskPaginator.total = response.data.total
          }),
          map((response: any) => {
            return response.data.data
          }),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.message)
            return of([])
          }),
          finalize(() => {
            this.tasksLoading$.next(false)
          })
        ).subscribe({
          next: (data: any[]) => {
            this.tasksDataSource.data = data
          }
        })
        break;
      case TasksPageTable.ORDERS:
        const orderParams: RequestSearchParams = {
          pageIndex: this.orderPaginator.pageIndex
        }
        this.ordersLoading$.next(true);
        this.orderService.index(orderParams, this.orderPaginator, this.searchTerm).pipe(
          tap((response: any) => {
            this.orderPaginator.total = response.data.total
          }),
          map((response: any) => {
            return response.data.data
          }),
          catchError((error: HttpErrorResponse) => {
            this.notificationService.showError(error.error.message)
            return of([])
          }),
          finalize(() => {
            this.ordersLoading$.next(false)
          })
        ).subscribe({
          next: (data: any[]) => {
            this.ordersDataSource.data = data
          }
        })
        break;
    }
  }
}
