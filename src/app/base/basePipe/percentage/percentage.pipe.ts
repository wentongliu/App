import { Pipe, PipeTransform } from '@angular/core';
/**
 * 小数点转百分比
 */
@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {
  /**
   *
   * @param value 小数值
   * @param args 百分数后保留几位
   * @returns {any}
   */
  transform(value: any, args?: any): any {
      if(!value){
        return "0%";
      }else{
        var str = Number(value*100).toFixed(args);
        str += "%";
        return str;
      }
  }

}
