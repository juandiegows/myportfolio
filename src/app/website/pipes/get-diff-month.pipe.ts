import { Pipe, PipeTransform } from '@angular/core';
import { Lang } from '../services/setting.service';

@Pipe({
    name: 'getDiffMonth',
    standalone: false
})
export class GetDiffMonthPipe implements PipeTransform {

  transform(_date1: string, _date2: string | null, lang : string): string {
    const date1 = this.getDate(_date1);
    const date2 = _date2 ? this.getDate(_date2) : new Date();
    const diferenciaEnMs = date2.getTime() - date1.getTime();
    const years = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diferenciaEnMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diferenciaEnMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    let result = " ";
    if (years > 0) {
      result += `${years} ${lang == Lang.en ? "Years" : "Años"}`;
    }
    if (months > 0) {
      result += ` ${months} ${lang == Lang.en ? "Mouth" : "Meses"} `;
    }
    if (days > 0) {
      result += ` ${days} ${lang == Lang.en ? "Days" : "Días"} `;
    }

    return result.trim() || 'Hoy';
  }

  private getDate(_date: string): Date {
    if (_date.includes('/')) {
      let dateParts = _date.split('/');
      return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
    } else {
      return new Date(_date);
    }
  }
}
