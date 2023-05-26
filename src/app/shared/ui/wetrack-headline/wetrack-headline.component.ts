import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wetrack-headline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wetrack-headline.component.html',
  styleUrls: ['./wetrack-headline.component.scss']
})
export class WetrackHeadlineComponent {
  @Input() size: number = 3
  @Input() isNavbar: boolean = false
}
