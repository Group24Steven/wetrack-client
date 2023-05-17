import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LayoutModule, MediaMatcher } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/api/auth.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SwitchTenantDialogComponent } from 'src/app/shared/components/dialogs/switch-tenant-dialog/switch-tenant-dialog.component';

@Component({
  selector: 'app-layout-sidenav',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatSidenavModule, MatMenuModule, MatListModule, MatIconModule, MatCheckboxModule, LayoutModule, MatToolbarModule, MatButtonModule, MatDialogModule,
    NavbarComponent
  ],
  templateUrl: './layout-sidenav.component.html',
  styleUrls: ['./layout-sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutSidenavComponent implements OnInit {
  mobileQuery: MediaQueryList

  currentUser: User | null = null

  private _mobileQueryListener: () => void

  constructor(public auth: AuthService, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private notificationService: NotificationService, private router: Router, private matDialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)

  }

  ngOnInit(): void {
    this.loadUser()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login'])
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.message)
      }
    })
  }

  openSwitchTenantDialog() {
    const dialogRef = this.matDialog.open(SwitchTenantDialogComponent, {
      width: '400px',
      data: {
        activeTenant: this.currentUser?.activeTenant
      }
    })

    dialogRef.afterClosed().subscribe((value) => { 
      if (!value) return  
      this.loadUser()
      window.location.reload()
    })
  }

  loadUser() {
    this.currentUser = this.auth.getCurrentUser()
  }
}
