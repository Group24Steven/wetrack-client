import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/api/auth.service';
import { User } from '../../models/user';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Output() sidenavToggle = new EventEmitter<void>()

  currentUser?: User

  constructor(public auth: AuthService, private notificationService: NotificationService, private router: Router) {
    this.currentUser = auth.getCurrentUser()
  }

  toggle(): void {
    this.sidenavToggle.next()
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
}
