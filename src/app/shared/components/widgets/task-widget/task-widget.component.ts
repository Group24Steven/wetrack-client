import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, HeadlineTwoComponent, MatIconModule],
  templateUrl: './task-widget.component.html',
  styleUrls: ['./task-widget.component.scss']
})
export class TaskWidgetComponent {

  tasks = [
    { name: 'Aufräumen', updated: '15.05.2023' },
    { name: 'Fegen', updated: '15.05.2023' },
    { name: 'Putzen', updated: '15.05.2023' },
  ]
}
