import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getFormattedDates',
    standalone: false
})
export class GetFormattedDatesPipe implements PipeTransform {
  transform(date1: string, date2: string | null): string {
    const date1Obj = this.getDate(date1);
    const date2Obj = date2 ? this.getDate(date2) : new Date();

    if (date1Obj.getFullYear() === date2Obj.getFullYear()) {
      if (date2 == null) {
        return `${date1Obj.getDate()}/${date1Obj.getMonth() + 1} - Actualmente`;
      }
      return `${date1Obj.getDate()}/${
        date1Obj.getMonth() + 1
      } - ${date2Obj.getDate()}/${
        date2Obj.getMonth() + 1
      } ${date1Obj.getFullYear()}`;
    } else {
      if (date2 == null) {
        return `${date1} - Actualmente`;
      }
      return `${date1} - ${date2}`;
    }
  }

  private getDate(_date: string): Date {
    if (_date.includes('/')) {
      let dateParts = _date.split('/');
      return new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
    } else {
      return new Date(_date);
    }
  }
}
