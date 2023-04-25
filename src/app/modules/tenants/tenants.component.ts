import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule, MatTableDataSource } from '@angular/material/table'
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator'
import { TenantService } from 'src/app/core/services/tenant.service'
import { Tenant } from 'src/app/core/models/tenant'
import { Observable, catchError, finalize, of, tap } from 'rxjs'

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss']
})
export class TenantsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'email', 'weclappToken', 'weclappToken']
  dataSource = new MatTableDataSource<Tenant>()
  isLoading = false

  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private tenantsService: TenantService) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.isLoading = true;

    this.tenantsService.index().pipe(
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
}