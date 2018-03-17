import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCase'
})
export class TextCasePipe implements PipeTransform {

  transform(str: string): string {
    if (str === undefined || str === null) {
      return str;
    }
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

}
