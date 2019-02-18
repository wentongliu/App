import { Pipe, PipeTransform } from '@angular/core';
import {Platform} from "@ionic/angular";
/**
 * 处理时间为国际时间，并处理ios时间不识别问题，根据设备处理成-或/的时间
 */
@Pipe({
  name: 'timeInteral'
})
export class TimeInteralPipe implements PipeTransform {

  constructor(public platform:Platform){

  }

  transform(value: Date, args?: any): any {
    let split="";
    console.log(this.isIos());
    if(this.isIos()){
        split="/";
    }else{
        split="-";
    }
    let year=value.getFullYear();
    let month=value.getMonth()+1;
    let day=value.getDate();
    let hour=value.getHours();
    let min=(value.getMinutes()+"").length==1?"0"+value.getMinutes():value.getMinutes();
    let time=year+split+month+split+day+" "+hour+":"+min;
    return time;
  }
  //检测是否是真机
  isMobile(): boolean {
    return this.platform.is('mobile');
  }

  isIos():boolean{
     let b=false;
    if(this.isMobile()){
       if(this.platform.is("android")){
         b=false;
       }
       if(this.platform.is("ios")|| this.platform.is('ipad') || this.platform.is('iphone')){
         b=true;
       }else{
         b=false;
       }
    }else{
      b=false;
    }
    return b;
  }


}
