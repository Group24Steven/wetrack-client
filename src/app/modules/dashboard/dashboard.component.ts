import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { ProjectWidgetComponent } from './project-widget/project-widget.component';
import { TaskWidgetComponent } from './task-widget/task-widget.component';
import { TimeRecordWidgetComponent } from './time-record-widget/time-record-widget.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeadlineTwoComponent,
    ProjectWidgetComponent,
    TaskWidgetComponent,
    TimeRecordWidgetComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor() { }
}
