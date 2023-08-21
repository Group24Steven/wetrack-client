import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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
import { AppEventService } from '../../services/app-event.service';
import { Subscription } from 'rxjs';
import { SwitchTenantDialogComponent } from 'src/app/shared/components/tenants/switch-tenant-dialog/switch-tenant-dialog.component';

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

export class LayoutSidenavComponent implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList
  @ViewChild('snav') sidenav!: MatSidenav;

  currentUser: User | null = null

  private _mobileQueryListener: () => void
  updateSubscription?: Subscription

  constructor(public auth: AuthService, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private notificationService: NotificationService, private router: Router, private matDialog: MatDialog, private eventService: AppEventService) {
    this.mobileQuery = media.matchMedia('(max-width: 1024px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
  }

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser()

    this.updateSubscription = this.eventService.userUpdated$.subscribe(() => {
      this.auth.getUser().subscribe({
        next: (user: User) => {
          this.currentUser = user
        }
      })
    })
  }

  ngAfterViewInit(): void {
    const toggled = localStorage.getItem('sidebar-toggle') || 'empty';
    if(toggled === 'collapsed') {
      this.sidenav.toggle(true);
    } else {
      this.sidenav.toggle(false);
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
    this.updateSubscription?.unsubscribe()
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login'])
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  toggle(): boolean {
    switch(this.sidenav.opened) {
      case true:
        localStorage.removeItem('sidebar-toggle');
        localStorage.setItem('sidebar-toggle', 'collapsed');
        this.sidenav.toggle(false);
        this.sidenav.opened
        return false;
      case false:
        localStorage.removeItem('sidebar-toggle');  
        localStorage.setItem('sidebar-toggle', 'expanded');
        this.sidenav.toggle(true);
        return true;
    }
  }

  openSwitchTenantDialog() {
    const dialogRef = this.matDialog.open(SwitchTenantDialogComponent, {
      width: '400px',
      data: {
        activeTenant: this.currentUser?.active_tenant
      }
    })

    dialogRef.afterClosed().subscribe((value) => {
      if (!value) return
      this.eventService.notifyUserUpdated()
    })
  }
}
