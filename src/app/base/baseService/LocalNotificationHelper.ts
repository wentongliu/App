import {Injectable} from '@angular/core';
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";

/**
 * Generated class for the AddressSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**
 * 手机消息通知，只要权限允许了，APP进程结束也可以通知到位，锁屏通知、手机顶部通知、呼吸灯通知等等一起的
 */
@Injectable()
export class LocalNotificationHelper {
  constructor(private localNotifications: LocalNotifications,private androidPermissions:AndroidPermissions){

  }

  /**
   * 显示通知（自定义ID）
   * @param id
   * @param title
   * @param msg
   * @param timeStamp  时间戳  1000=1s
   */
  doNoticeId(id:number,title:string,msg:string,timeStamp:number){
    this.localNotifications.schedule(
      {
        id: id,
        title: title,
        text: msg,
        trigger:{at: new Date(new Date().getTime() + timeStamp)}
      });
  }
  /**
   * 显示通知（随机ID）,会返回消息ID
   * @param title
   * @param msg
   * @param timeStamp
   */
  doNoticeNoId(title:string,msg:string,timeStamp:number):number{
    let num:number=Math.ceil(Math.random()*999);
    this.localNotifications.schedule(
      {
        id: num,
        title: title,
        text: msg,
        trigger:{at: new Date(new Date().getTime() + timeStamp)}
      });
    return num;
  }

  /**
   * 关闭一个通知
   * @param id
   */
  cancelNotice(id:number){
    this.localNotifications.cancel(id);
  }
}
