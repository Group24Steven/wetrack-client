import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFilterComponent } from '../base-filter/base-filter.component';

@Component({
  selector: 'app-customer-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent extends BaseFilterComponent {

}
