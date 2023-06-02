import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekdayDate',
  standalone: true
})
export class WeekdayDatePipe implements PipeTransform {

  transform(value: string): string {
    const datePipe = new DatePipe('de-DE'); // for German, adjust for other locales

    const dateParts = value.split('-')
    const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
    const day = datePipe.transform(dateObject, 'EE')
    const date = datePipe.transform(dateObject, 'MMM dd')
    return `${day}, ${date}`
  }

}
