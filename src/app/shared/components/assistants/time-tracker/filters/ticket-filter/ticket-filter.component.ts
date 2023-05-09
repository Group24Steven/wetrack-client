import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFilterComponent } from '../base-filter/base-filter.component';

@Component({
  selector: 'app-ticket-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-filter.component.html',
  styleUrls: ['./ticket-filter.component.scss']
})
export class TicketFilterComponent extends BaseFilterComponent {

}
