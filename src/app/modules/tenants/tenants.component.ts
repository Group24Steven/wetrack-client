import { Component, ViewChild, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'
import { Tenant } from 'src/app/core/models/tenant'
import { catchError, finalize, of, tap } from 'rxjs'
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

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatButtonModule, MatRippleModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, HeadlineComponent, MatDialogModule],
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})

export class TenantsComponent implements OnInit {

  searchTerm = ''
  loading = false

  displayedColumns: string[] = ['id', 'email', 'weclappUrl']
  dataSource = new MatTableDataSource<Tenant>()

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private tenantService: TenantService, private dialog: MatDialog, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  openTenantForm(data?: number): void {
    const dialogRef: MatDialogRef<TenantDialogComponent> = this.dialog.open(TenantDialogComponent, { width: '400px', data: {
      id: data
    }})

    dialogRef.afterClosed().subscribe((value: any) => {
      if (value === undefined || Object.keys(value).length < 1) return
      // this.createTenant(value)
    })
  }

  private loadUsers(): void {
    this.loading = true;

    this.tenantService.index().pipe(
      tap((tenants: Tenant[]) => {
        this.dataSource.data = tenants
        this.dataSource.paginator = this.paginator
      }),
      catchError((error) => {
        return of([]) // Return an empty array on error
      }),
      finalize(() => {
        this.loading = false
      })
    ).subscribe({
      error: (err: HttpErrorResponse) => {
        this.notificationService.showError(err.error.message)
      }
    })
  }
}