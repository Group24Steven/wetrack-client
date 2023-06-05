import { Component, ViewChild, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'
import { Tenant } from 'src/app/core/models/tenant'
import { BehaviorSubject, Subscription, catchError, finalize, of, tap } from 'rxjs'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { HeadlineComponent } from 'src/app/shared/ui/headline/headline.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TenantDialogComponent } from './tenant-dialog/tenant-dialog.component'
import { TenantService } from 'src/app/core/services/api/tenant.service'
import { NotificationService } from '../../core/services/notification.service';
import { HttpErrorResponse } from '@angular/common/http'
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { AppEventService } from '../../core/services/app-event.service';
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule, MatRippleModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, HeadlineComponent, MatDialogModule, ProgressBarComponent, MatTooltipModule],
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
})

export class TenantsComponent implements OnInit {

  searchTerm = ''
  loading$ = new BehaviorSubject<boolean>(false)

  displayedColumns: string[] = ['id', 'name', 'weclappUrl']
  dataSource = new MatTableDataSource<Tenant>()

  updateSubscription?: Subscription
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private tenantService: TenantService, private dialog: MatDialog, private notificationService: NotificationService, private eventService: AppEventService) { }

  ngOnInit(): void {
    this.load()
    this.updateSubscription = this.eventService.userUpdated$.subscribe(() => this.load())
  }

  openTenantForm(data?: number): void {
    const dialogRef: MatDialogRef<TenantDialogComponent> = this.dialog.open(TenantDialogComponent, {
      width: '400px', data: {
        id: data
      }
    })

    dialogRef.afterClosed().subscribe((value: any) => {
      if (!value) return
      this.eventService.notifyUserUpdated()
      this.load()
    })
  }

  private load(): void {
    this.loading$.next(true)

    this.tenantService.index().pipe(
      tap((tenants: Tenant[]) => {
        this.dataSource.data = tenants
        this.dataSource.paginator = this.paginator
      }),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
        return of([])
      }),
      finalize(() => {
        this.loading$.next(false)
      })
    ).subscribe()
  }
}