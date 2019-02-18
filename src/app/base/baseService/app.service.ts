import {Injectable} from '@angular/core';
import {AlertController, Platform, Events} from "@ionic/angular";

/**
 * 常用的工具类
 */
declare   let $;
declare  let startApp;//启动第三方的app的插件调用入口
declare  let appAvailability;//检测手机上是否已安装了某app，通常配合startapp使用

@Injectable()
export class AppGlobal {

  //接口域名地址
  static domain = "https://tlimama.tongedev.cn"

  //接口地址
  static API: any = {};

  //APP版本号
  static versionNumber: string = '1.0.0';

  //高德web API服务key
  static gaoDeKey: any = "42819360a0e9289d171f423f4ea9d794"

  // 验证码倒计时参数
  static verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }

}

@Injectable()
export class AppService {

  constructor(public event:Events, private alertCtrl: AlertController,private  platform:Platform) {

  }

  /**
   *
   * @param header
   * @param mes
   * @param success promise回调
   * @param err
   * @returns {Promise<void>}
   */
  async comfire(header,mes,success,err){
    let aler=await this.alertCtrl.create({
      header:header,
      message:mes,
      buttons:[
        {
          text:"取消",
          handler:()=>{
            if(err){
              err().then();
            }
          }
        },
        {
          text:"确定",
          handler:()=>{
              if(success){
                success().then();
              }
          }
        }
      ]
    });

    await  aler.present();
  }

  async alert(header,mes,success,error){
     let aler=await this.alertCtrl.create({
       header:header,
        message:mes,
       buttons:[
         {
           text:"取消",
           handler:()=>{
             if(error) {
               error().then();
             }
           }
         },
         {
           text:"确定",
           handler:()=>{
             if(success) {
               success().then();
             }
           }
         }
       ]
     });

     await  aler.present();
  }



  /**
   *  验证码倒计时
   */
  getVerifyCode(verifyCode: any) {
    //发送验证码成功后开始倒计时
    verifyCode.disable = false;
    if (verifyCode.countdown == 1) {
      console.log(verifyCode);
      verifyCode.countdown = 60;
      verifyCode.verifyCodeTips = "获取验证码";
      verifyCode.disable = true;
      return;
    } else {
      verifyCode.countdown--;
      verifyCode.verifyCodeTips = verifyCode.countdown + "秒后重试";
    }

    setTimeout(() => {
      this.getVerifyCode(verifyCode);
    }, 1000);
  }

  /**
   * 打开百度地图APP
   */
  openBaiDuMap(dizhi:string) {
    let scheme;
    let sApp;
    if (this.platform.is('ios')) {
      scheme = 'baidu://';
    } else if (this.platform.is('android')) {
      scheme = 'com.baidu.BaiduMap';
    }

    appAvailability.check(
      scheme,       // URI Scheme or Package Name
      () =>{  // Success callback
        if (this.platform.is('ios')) {

          sApp = startApp.set("baidumap://");
          sApp.start(()=> { /* success */

          }, (error)=> { /* fail */

          });
        } else if (this.platform.is('android')) {

          sApp = startApp.set({ /* params */
            "action":"ACTION_VIEW",
            "category":"CATEGORY_DEFAULT",
            "type":"text/css",
            "package":"com.baidu.BaiduMap",
            "uri":"baidumap://map/direction?origin=我的位置&destination="+dizhi+"&mode=driving",//这个链接可替换为坐标的地址
            "flags":["FLAG_ACTIVITY_CLEAR_TOP","FLAG_ACTIVITY_CLEAR_TASK"],
            // "component": ["com.android.GoBallistic","com.android.GoBallistic.Activity"],
            "intentstart":"startActivity",
          }, { /* extras */
            "EXTRA_STREAM":"extraValue1",
            "extraKey2":"extraValue2"
          });
          sApp.start(() => { /* success */

          }, (error) => { /* fail */

          });
        }


      },
      () =>{  // Error callback
        if (this.platform.is('ios')) {
          window.open("https://itunes.apple.com/cn/app/id452186370")
        } else if (this.platform.is('android')) {
          window.open("http://map.baidu.com/zt/client/index/")
        }
      }
    );
  }


  /**
   * 打开高德地图
   * @param iptId
   * @param fun
   */
  openGaoDeMap(slat,slon,dlat,dlon,sname,dname) {
    let scheme;
    let sApp;
    if (this.platform.is('ios')) {
      scheme = 'iosamap://';
    } else if (this.platform.is('android')) {
      scheme = 'com.autonavi.minimap';
    }

    appAvailability.check(
      scheme,       // URI Scheme or Package Name
      () =>{  // Success callback
        if (this.platform.is('ios')) {

          sApp = startApp.set("iosamap://path?sourceApplication=applicationName&sid=BGVIS1&slat="+slat+"&slon="+slon+"&sname="+sname+"&did=BGVIS2&dlat="+dlat+"&dlon="+dlon+"&dname="+dname+"&dev=0&t=0");
          sApp.start(()=> { /* success */

          }, (error)=> { /* fail */

          });
        } else if (this.platform.is('android')) {

          sApp = startApp.set({ /* params */
            "action":"ACTION_VIEW",
            "category":"CATEGORY_DEFAULT",
            "type":"text/css",
            "package":"com.autonavi.minimap",
            "uri":"amapuri://route/plan/?sid=BGVIS1&slat="+slat+"&slon="+slon+"&sname="+sname+"&did=BGVIS2&dlat="+dlat+"&dlon="+dlon+"&dname="+dname+"&dev=0&t=0",   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径
            "flags":["FLAG_ACTIVITY_CLEAR_TOP","FLAG_ACTIVITY_CLEAR_TASK"],
            "intentstart":"startActivity",
          }, { /* extras */
            "EXTRA_STREAM":"extraValue1",
            "extraKey2":"extraValue2"
          });
          sApp.start(() => { /* success */
              //alert("success");
          }, (error) => { /* fail */
            //alert(error);
          });
        }


      },
      () =>{  // Error callback
        if (this.platform.is('ios')) {
          window.open("https://itunes.apple.com/cn/app/gao-tu-zui-zhuan-ye-shou-ji/id461703208")
        } else if (this.platform.is('android')) {
          window.open("http://shouji.baidu.com/software/8184180.html")
        }
      }
    );
  }

  //按下回车或输入法的确认后执行
  keywordDown(iptId,fun){
      iptId.onkeyup=(event)=>{
        if(event.keyCode==13){
            fun();
        }
      }
  }

  /**
   * 传入一个date类型的值，有或者没有都会返回2018-05-21这样的格式日期
   * @param cellval
   * @returns {string}
   */
  changeDateFormat(cellval):string{
    var dateVal = cellval + "";
    if (cellval != null) {
      var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      //return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
      return date.getFullYear() + "-" + month + "-" + currentDate;
    }else{
      var date = new Date();
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      //return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
      return date.getFullYear() + "-" + month + "-" + currentDate;
    }
  }



  theHeight:number=0;
  scrollPage(touElementId,gridc){
    var that=this;
    let startX;
    let startY;
    touElementId.addEventListener('touchstart',function(e){
      console.log(e);
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
    });
    touElementId.addEventListener('touchmove',function(e){

      let moveEndX = e.changedTouches[0].pageX;
      let moveEndY = e.changedTouches[0].pageY;
      let X = moveEndX - startX;
      let Y = moveEndY - startY;

      if(Math.abs(X) > Math.abs(Y) && X > 0 ) {

      }
      else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {

      }
      else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
        if(that.theHeight>=0){
          that.theHeight=that.theHeight-15;
          gridc.style.height=that.theHeight+"px";
          if(that.theHeight<=15){
            gridc.style.display="none";
          }
        }
      }
      else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
        if(that.theHeight<=160){
          that.theHeight=that.theHeight+15;
          gridc.style.height=that.theHeight+"px";
          gridc.style.display="block";
        }
      }
      else{

      }
    });
  }

  /**
   *
   * 下面三句用于正则表达式验证
   */
  phone:any= /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
  email:any=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  sfz:any=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  /**
   * 表单验证
   * 返回true则表示通过
   */
  validateForm(type,val){
      if(type=="phone"){//如果是手机号，则使用手机号码的正则表达式
          if(this.phone.test(val)===false){
              return false;
          }else{
            return true;
          }
      }else if(type=="email"){//如果是邮箱，则使用邮箱的正则表达式
        if(this.email.test(val)===false){
          return false;
        }else{
          return true;
        }
      }else if(type=="sfz"){//如果是身份证，则使用身份证的正则表达式
        if(this.sfz.test(val)===false){
          return false;
        }else{
          return true;
        }
      }
  }





  //this.appService.createLoading("加载中...");
  //this.appService.dismissLoadding();
  createLoading(text="加载中"){
    setTimeout(function () {
      var header=$("ion-header").css("height")+"";
      var content=$("ion-app").css("height")+"";
      header=header.substring(0,header.indexOf("px"));
      content=content.substring(0,content.indexOf("px"));
      var newHei=parseInt(content)-parseInt(header);
      var html=`<div class="loadding" style="position:absolute;width:100%;height:${newHei}px;margin-top:${header}px;opacity: 0.8;z-index:600;"></div><div class="loadding" style="width:35%;height:5em;background-color: #4f4f4f;
margin: 0px auto;padding:0px;position: fixed;left:0;right:0;top:40%;z-index:9999;opacity: 0.9;text-align: center">
    <p style="margin: 0px;padding:0px;color:#fff;height:100%;line-height: 5em;"><img style="width:2em;height:2em;position:relative; top:0.6em;right:0.4em" src="assets/imgs/loadding.gif">${text}</p></div>`;
      $("ion-content").append(html);
    },300)
  }

  dismissLoadding(){
    setTimeout(function () {
      $(".loadding").remove();
    },300);
  }


  createLogin(text="登录成功"){
    setTimeout(function () {
      var header=$("ion-header").css("height")+"";
      var content=$("ion-app").css("height")+"";
      header=header.substring(0,header.indexOf("px"));
      content=content.substring(0,content.indexOf("px"));
      var newHei=parseInt(content)-parseInt(header);
      var html=`<div class="loadding" style="position:absolute;width:100%;height:${newHei}px;margin-top:${header}px;opacity: 0.8;z-index:600;"></div><div class="loadding" style="width:35%;height:7em;background-color: #4f4f4f;
margin: 0px auto;padding:0px;position: fixed;left:0;right:0;top:40%;z-index:9999;opacity: 0.9;text-align: center">
<img style="width:3em;height:3em;position:relative; top:1em;right:0.2em" src="assets/imgs/login/cg.png">
    <p style="margin: 0px;padding:0px;color:#fff;height:100%;line-height: 7em;position:relative; top:-1.2em;">${text}</p></div>`;
      $("ion-content").append(html);
    },200)
  }
}
