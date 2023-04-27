import { Component, ViewChild, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'
import { TenantService } from 'src/app/core/services/tenant.service'
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

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, HeadlineComponent, MatDialogModule],
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  searchTerm = ''
  isLoading = false

  displayedColumns: string[] = ['id', 'email', 'weclappToken', 'weclappUrl']
  dataSource = new MatTableDataSource<Tenant>()

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private tenantService: TenantService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  openTenantForm(): void {
    const dialogRef: MatDialogRef<TenantDialogComponent> = this.dialog.open(TenantDialogComponent, { width: '400px' })

    dialogRef.afterClosed().subscribe((value: any) => {
      if (Object.keys(value).length < 1) return
      
      this.createTenant(value)
    })
  }

  private loadUsers(): void {
    this.isLoading = true;

    this.tenantService.index().pipe(
      tap((tenants: Tenant[]) => {
        this.dataSource.data = tenants;
        this.dataSource.paginator = this.paginator
      }),
      catchError((error) => {
        console.error('Error fetching tenants:', error);
        return of([]); // Return an empty array on error
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()
  }

  private createTenant(tenantData: Tenant): void {
    this.isLoading = true;

    this.tenantService.store(tenantData).pipe(
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe({
      next: (value: Tenant) => console.log(value),
      error: (error: any) => console.log(error),
    })
  }
}