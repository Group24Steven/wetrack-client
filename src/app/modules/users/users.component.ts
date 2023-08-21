import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'
import { BehaviorSubject, Subscription, catchError, debounceTime, distinctUntilChanged, finalize, map, of, tap } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { HeadlineComponent } from 'src/app/shared/ui/headline/headline.component'
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { NotificationService } from '../../core/services/notification.service'
import { HttpErrorResponse } from '@angular/common/http'
import { MatRippleModule } from '@angular/material/core'
import { MatDividerModule } from '@angular/material/divider'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { User } from 'src/app/core/models/user'
import { UserService } from 'src/app/core/services/api/user.service'
import { RequestPaginator, RequestSearchParams } from 'src/app/core/services/api/base-api.service'
import { UserDialogComponent } from './user-dialog/user-dialog.component'
import { AppEventService } from 'src/app/core/services/app-event.service'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule, MatRippleModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, HeadlineComponent, MatDialogModule, ProgressBarComponent, MatTooltipModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {
  searchTerm = ''
  searchCtrl = new FormControl()
  searchSubscription: Subscription
  loading$ = new BehaviorSubject<boolean>(false)

  displayedColumns: string[] = ['id', 'name', 'email']
  dataSource = new MatTableDataSource<User>()

  paginator: RequestPaginator = {
    pageIndex: 0,
    pageSize: 15,
    total: 0
  }

  constructor(private userService: UserService, private dialog: MatDialog, private notificationService: NotificationService, private eventService: AppEventService) {}

  ngOnInit(): void {
    this.loadData()
    this.searchSubscription = this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => { 
        this.loadData()
      })
  }

  ngOnDestroy(): void {
    if(this.searchSubscription) this.searchSubscription.unsubscribe();
  }

  onSearch(event: any) {
    this.paginator.pageIndex = 0
    this.searchTerm = event.target.value
    this.loadData()
  }

  openForm(data?: number): void {
    const dialogRef: MatDialogRef<UserDialogComponent> = this.dialog.open(UserDialogComponent, {
      width: '400px', data: {
        id: data
      }
    })

    dialogRef.afterClosed().subscribe((value: any) => {
      if (!value) return
      this.loadData()
    })
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.pageIndex
    this.loadData()
  }

  private loadData(): void {
    this.loading$.next(true);

    const params: RequestSearchParams = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    }

    this.userService.index(params, this.paginator, this.searchTerm).pipe(
      tap((response: any) => {
        this.paginator.total = response.data.total
      }),
      map((response: any) => {
        return response.data.data
      }),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of([])
      }),
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe({
      next: (data: any[]) => {
        this.dataSource.data = data
      }
    })
  }
}