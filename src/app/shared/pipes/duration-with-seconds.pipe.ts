import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationWithSeconds', standalone: true,
})
export class DurationWithSecondsPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (!value) return '00:00:00'

    
    const hours = Math.floor(value / 3600)
    const minutes = Math.floor((value % 3600) / 60)
    const seconds = Math.floor(value % 60)

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

}
