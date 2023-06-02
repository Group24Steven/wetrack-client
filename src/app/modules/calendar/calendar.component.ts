import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyCalendarComponent } from './weekly-calendar/weekly-calendar.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, WeeklyCalendarComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

}
