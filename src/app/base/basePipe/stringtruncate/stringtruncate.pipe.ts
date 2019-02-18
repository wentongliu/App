import { Pipe, PipeTransform } from '@angular/core';

/**
 * 字符串长度超过args位后截取，显示小数点
 */
@Pipe({
  name: 'StringTruncate'
})
export class StringTruncatePipe implements PipeTransform {
  /**
   *
   * @param value 字符串
   * @param args 截取的位数
   * @returns {any}
   */
  transform(value: any, args?: any): any {
    const bitnum = args;
    if (value && value.length > bitnum) {
      return value.substr(0, bitnum) + '...';
    } else {
      return value;
    }
  }

}
