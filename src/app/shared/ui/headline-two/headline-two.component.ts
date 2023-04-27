import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headline-two',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './headline-two.component.html',
  styleUrls: ['./headline-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeadlineTwoComponent {
  @Input() title: string = ''
}
