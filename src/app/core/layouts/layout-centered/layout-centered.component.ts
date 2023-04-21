import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-centered',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout-centered.component.html',
  styleUrls: ['./layout-centered.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCenteredComponent {

}
