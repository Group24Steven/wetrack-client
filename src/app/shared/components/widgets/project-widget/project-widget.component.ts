import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-widget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, HeadlineTwoComponent, MatIconModule],
  templateUrl: './project-widget.component.html',
  styleUrls: ['./project-widget.component.scss']
})
export class ProjectWidgetComponent {
  projects = [
    { name: 'Projekt Group24', updated: '15.05.2023' },
    { name: 'Projekt McDonalds', updated: '15.05.2023' },
    { name: 'Projekt Adidas', updated: '15.05.2023' },
    { name: 'Projekt Nike', updated: '15.05.2023' },
    { name: 'Projekt Motel One', updated: '15.05.2023' },
    { name: 'Projekt Volkswagen', updated: '15.05.2023' },
  ]
}
