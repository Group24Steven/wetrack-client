import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user';
import { MatMenuModule } from '@angular/material/menu';
import { WetrackHeadlineComponent } from '../../../shared/ui/wetrack-headline/wetrack-headline.component';
import { InitialsPipe } from 'src/app/shared/pipes/initials.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, WetrackHeadlineComponent, InitialsPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Output() sidenavToggleEvent = new EventEmitter<void>()
  @Output() logoutEvent = new EventEmitter<void>()
  @Output() switchTenantEvent = new EventEmitter<void>()

  @Input() currentUser?: User | null

  toggle(): void {
    this.sidenavToggleEvent.next()
  }
}
