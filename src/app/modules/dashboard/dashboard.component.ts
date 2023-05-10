import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { TimeRecordWidgetComponent } from 'src/app/shared/components/widgets/time-record-widget/time-record-widget.component';
import { ProjectWidgetComponent } from 'src/app/shared/components/widgets/project-widget/project-widget.component';
import { TaskWidgetComponent } from 'src/app/shared/components/widgets/task-widget/task-widget.component';

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
