import {Injectable} from '@angular/core';
import {AppService} from "./app.service";
import {GPS_worker} from "./GPS_worker";
import {StorageProvider} from "../baseProvider/storage";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";


/**
 * 定位接口
 */
declare  var AMap;
@Injectable()
export class LocationHelper {
  lng:any;
  lat:any;
  locationCity:string='';
  constructor(public sp:StorageProvider,public appService:AppService,public gPS_worker:GPS_worker){

  }

  /**
   * 定位
   */
  getCurrentPosition(){
    var that=this;
    let alertLock:boolean=false;//加一个锁，不然定位失败会无限循环失败回调
    navigator.geolocation.getCurrentPosition(function (position) {
      // that.lng=position.coords.longitude;
      // that.lat=position.coords.latitude;
      let zhuanGPS:any=that.gPS_worker.gcj_encrypt(position.coords.latitude,position.coords.longitude);//手机GPS定位经纬度转高德经纬度
      that.lng=zhuanGPS.lon;
      that.lat=zhuanGPS.lat;
      this.sp.set('lng',that.lng);
      this.sp.set('lat',that.lng);
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        })
        var lnglat = [that.lng, that.lat];
        geocoder.getAddress(lnglat, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result为对应的地理位置详细信息
            that.geocoder_CallBack(result);
          }
        })
      });
    },function(error){
      if(!alertLock){
        //'警告','定位失败！请检查手机设置';
        that.appService.alert("警告","定位失败！请检查手机设置",null,null);
        alertLock=true;
      }
    },{enableHighAccuracy:true});
  }

  /**
   * 存储定位城市
   * @param data
   */
  geocoder_CallBack(data) {
    var qu=data.regeocode.addressComponent.district;
    if(qu.lastIndexOf('区')==(qu.length-1)){
      this.locationCity=data.regeocode.addressComponent.city;
    }else{
      this.locationCity=qu;
    }
    this.sp.set('GPS_City',this.locationCity);
    // alert(data.regeocode.addressComponent.city);
    // var address = data.regeocode.formattedAddress; //返回地址描述
    // document.getElementById("result").innerHTML = address;
  }

}
