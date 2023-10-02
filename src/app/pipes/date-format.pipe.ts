import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(value: any, formatType?: string): string | null {
    switch(formatType) {
      case 'shortDate':
        return this.shortDate(value);
      case 'longDate':
        return this.longDate(value);  
      case 'timeDate':
        return this.timeDate(value);      
      default:
        return this.defaultFormat(value);
    }
  }

  private defaultFormat(value: any): string | null {
    return this.datePipe.transform(value, 'yyyy-MM-dd HH:mm');
  }

  private shortDate(value: any): string | null {
    return this.datePipe.transform(value, 'yyyy-MM-dd');
  }

  private timeDate(value: any): string | null {
    return this.datePipe.transform(value, 'HH:mm');
  }
  private longDate(value: any): string | null {
    return this.datePipe.transform(value, 'fullDate'); // Esto mostrará un formato más largo para la fecha
  }

}
