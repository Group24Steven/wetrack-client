import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseFilterComponent } from '../base-filter/base-filter.component';

@Component({
  selector: 'app-project-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent extends BaseFilterComponent {

}
