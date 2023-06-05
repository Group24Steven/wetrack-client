import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {

  transform(value: string): string {
    let words = value.split(' ');

    if (words.length == 1) {
      return words[0][0].toUpperCase();
    } else {
      let initials = '';
      for (let word of words) {
        if (word.length > 0) {
          initials += word[0].toUpperCase();
        }
      }
      return initials;
    }
  }

}
