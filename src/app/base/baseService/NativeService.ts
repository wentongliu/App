import {Injectable} from '@angular/core';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {FileTransferObject, FileTransfer} from "@ionic-native/file-transfer/ngx";
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {AlertController,Platform} from "@ionic/angular";
import {StorageProvider} from "../baseProvider/storage";
import {HttpService} from "./Http-service";
import {File} from "@ionic-native/file/ngx";
import {AppService} from "./app.service";

/**
 *  app在线更新接口
 */
declare  let startApp;
@Injectable()
export class NativeService {

  appV:string;

  constructor(private platform: Platform,
              private appService: AppService,
              private transfer: FileTransfer,
              private appVersion: AppVersion,
              private file: File,
              private http:HttpService,
              public sp:StorageProvider,
              private fileOpener: FileOpener,
              private inAppBrowser: InAppBrowser) {
  }


  /**
   * 检查app是否需要升级
   */
    detectionUpgrade(t) {
    //这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
    //版本号不一样就需要申请,不需要升级就return
    var that=this;
    that.getVersionNumber();
    var platform="android";
    if(this.isAndroid()){
      platform="android";
    }else if(this.isIos()){
      platform="ios";
    }else{
      platform="android";
    }
    var data={packageName:"com.app.jpshequ",platform:platform};
    this.http.POST(data,"/app/open/version/checkappversion/appVersion",(res,err)=>{
      console.log(res);
      if(res){
        var theNum=that.appV;
        if(theNum!=null&&theNum!=""&&theNum!="undefined"&&theNum!=res.obj.versionNo){
           this.downloadApp();
        }else{
          if(t){
            this.appService.alert("提示","最新版本",null,null)
          }
        }
      }
    })
  }

  /**
   * 下载安装app
   */
  async downloadApp() {
    var that=this;
    if (this.isAndroid()) {
      const fileTransfer: FileTransferObject = this.transfer.create();
      const apk = this.file.externalRootDirectory + '家与家.apk'; //apk保存的目录

      fileTransfer.download("http://192.168.1.6:8080/upload/apk/家与家.apk", apk).then(() => {
        that.fileOpener.open(apk,'application/vnd.android.package-archive').then(()=>{

        });
      });

      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {

        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    }
    if (this.isIos()) {
      this.openUrlByBrowser("这里边填写下载iOS地址");
    }
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url:string):void {
    this.inAppBrowser.create(url, '_system');
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile(): boolean {
    return this.platform.is('mobile');
  }

  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   * @returns {Promise<string>}
   */
  getVersionNumber(): Promise<string> {
    var that=this;
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((value: string) => {
        that.appV=value;
        that.sp.set('appVersion',value);
        resolve(value);
      }).catch(err => {
        console.log('getVersionNumber:' + err);
      });
    });
  }
}
