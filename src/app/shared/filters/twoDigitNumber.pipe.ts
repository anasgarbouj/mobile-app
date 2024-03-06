import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appTwoDigitNumber',
  pure: true
})
export class TwoDigitNumberPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value !== 'number') {
      throw new Error('TwoDigitNumberPipe: Argument must be a number');
    }
    return String(value).padStart(2, '0');
  }
}
