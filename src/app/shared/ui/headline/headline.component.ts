import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadlineComponent {
  @Input() title: string = ''
}
