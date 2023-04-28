import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, MatGridListModule, MatCardModule, MatListModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule,
    HeadlineTwoComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  projects = [
    { name: 'Projekt Group24', updated: '15.05.2023' },
    { name: 'Projekt McDonalds', updated: '15.05.2023' },
    { name: 'Projekt Adidas', updated: '15.05.2023' },
    { name: 'Projekt Nike', updated: '15.05.2023' },
    { name: 'Projekt Motel One', updated: '15.05.2023' },
    { name: 'Projekt Volkswagen', updated: '15.05.2023' },
  ]

  tasks = [
    { name: 'Aufräumen', updated: '15.05.2023' },
    { name: 'Fegen', updated: '15.05.2023' },
    { name: 'Putzen', updated: '15.05.2023' },
  ]

  times = [
    { name: 'Aufräumen', time: 1 },
    { name: 'Fegen', time: 2 },
    { name: 'Putzen', time: 3.5 },
  ]

  constructor() { }
}
