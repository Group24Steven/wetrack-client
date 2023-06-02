import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WeekdayDatePipe } from 'src/app/shared/pipes/weekday-date.pipe';

@Component({
  selector: 'app-weekly-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, WeekdayDatePipe],
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.scss']
})
export class WeeklyCalendarComponent {
  selectedDate: Date = new Date();
  weekDays: string[] = [];
  hours: number[] = Array.from(Array(24).keys()); // generates array [0, 1, ..., 23]

  ngOnInit() {
    this.updateCalendar();
  }

  onDateChange(event: any) {
    this.selectedDate = new Date(event.value);
    this.updateCalendar();
  }

  updateCalendar() {
    const start = this.getWeekStart(this.selectedDate);
    this.weekDays = Array.from(Array(7).keys()).map(i => {
      const day = new Date(start.getTime());
      day.setDate(day.getDate() + i);
      return `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`;
    });
  }

  getWeekStart(date: Date): Date {
    const weekStart = new Date(date.getTime());
    while (weekStart.getDay() !== 1) { // adjust 1 to whichever day is the start of your week
      weekStart.setDate(weekStart.getDate() - 1);
    }
    return weekStart;
  }
}
