import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-headline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-headline.component.html',
  styleUrls: ['./sub-headline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubHeadlineComponent {
  @Input() title: string = ''
}
