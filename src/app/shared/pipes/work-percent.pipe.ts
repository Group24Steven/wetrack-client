import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workPercent',
  standalone: true
})
export class WorkPercentPipe implements PipeTransform {

  transform(durationInSeconds: number): number {
    return durationInSeconds / 28800 * 100
  }
}
