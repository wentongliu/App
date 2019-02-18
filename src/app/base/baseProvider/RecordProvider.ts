import {Injectable} from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject, FileUploadResult } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {Platform} from "@ionic/angular";
import {AppService} from "../baseService/app.service";

/**
 *录音
 */
@Injectable()
export class RecordProvider {
  filepath:string;//文件路径
  fileName:string;//文件名
  statusStr:string;//状态
  mediaObj:any;//录音对象
  constructor( public platform: Platform,public appService:AppService,
              public mediaCapture: MediaCapture, public media: Media, public ft: FileTransfer, private file: File) {
  }

  // cordova-plugin-media 的使用
  startRecording_Media() {
    var that=this;
    that.platform.ready().then(() => {

      let mediaObj;
      var recordName = this.generateFileName() + ".wav";
      that.fileName = recordName;

      if (that.platform.is('ios')) {
        that.file.createFile(this.file.documentsDirectory, recordName, true).then(() => {
          that.filepath=that.file.documentsDirectory.replace(/^file:\/\//, '') + recordName;
          mediaObj = that.media.create(that.filepath);
          that.mediaObj=mediaObj;
          that.doRecord_Media(mediaObj);
        });
      } else if (that.platform.is('android')) {
        that.filepath=recordName;
        mediaObj = that.media.create(recordName);
        that.mediaObj=mediaObj;
        that.doRecord_Media(mediaObj);
      } else {
        //设备不支持录音")
        return;
      }
    });
  }

  doRecord_Media(mediaObj: MediaObject) {
    var that=this;
    // 开始录音
    mediaObj.startRecord();

    // 监测录音状态的回调
    mediaObj.onStatusUpdate.subscribe(status => that.showRecordStatus(status));

    // 录音成功后的处理，如上传录音
    mediaObj.onSuccess.subscribe(() => {
      //that.uploadFile(that.filepath)不使用自动上传
    });

    // 录音失败后的处理，如提示错误码
    mediaObj.onError.subscribe(error => {
      //"录音失败"+error
    });

    // 设置录音的长度，单位毫秒，ios / android 均有效
    //window.setTimeout(() => mediaObj.stopRecord(), 10 * 1000);
  }

  // 上传 File Transfer Plugin 的使用
  /**
   *
   * @param filePath  文件路径
   */
  uploadFile(filePath) {
  var that=this;
    // 设置上传参数
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: this.fileName,
      mimeType: "audio/wav"
    };

    const ftObj: FileTransferObject = this.ft.create();
    ftObj.upload(filePath,
      encodeURI("http://ec2-52-87-177-182.compute.amazonaws.com/upload.php"), options).then(
      (data) => {
       //上传成功！");
      },
      (err) => {
        //上传失败："+ err.code);
      });
  }

  // 生成录音文件名的方法：yyyymmddhhmmss(月和日不足两位补0)
  complement(n) { return n < 10 ? '0' + n : n }

  generateFileName() {
    var date = new Date();
    return date.getFullYear().toString() + this.complement(date.getMonth() + 1) + this.complement(date.getDate()) + this.complement(date.getHours()) + this.complement(date.getMinutes()) + this.complement(date.getSeconds());
  }

  // 根据录音状态码返回录音状态的方法
  showRecordStatus(status) {
    this.statusStr = "";
    switch (status) {
      case 0:
        this.statusStr = "None";
        break;
      case 1:
        this.statusStr = "Start";
        break;
      case 2:
        this.statusStr = "Running";
        break;
      case 3:
        this.statusStr = "Paused";
        break;
      case 4:
        this.statusStr = "Stopped";
        break;
      default:
        this.statusStr = "None";
    }
    if(this.statusStr=="Stopped"){
      //this.bof(this.filepath,true,5);
    }
  }

  /**
   * 回调函数
   * @param callback
   */
  stop(callback){
    //录音正在运行时，才允许停止录音
    if(this.mediaObj!=null&&this.mediaObj!=""&&this.statusStr=="Running"){
      this.mediaObj.stopRecord();
      //当state为stop时，才允许再次点击录音
      var data={filepath:this.filepath,state:this.statusStr};
      callback(data).then();
    }
  }


  //播放录音
  // this.bof(this.filepath,true,5);
  bof(path,lo,time) {
    var that = this;
      if (lo) {
        var media = that.media.create(path);
        if (media != null) {
          media.play();
          lo = false;
          setTimeout(function () {
            lo = true;
            media.stop();
          },time*1000);
        }
      } else {
         lo = true;
        var media = that.media.create(path);
        if (media != null) {
          media.stop();
        }
      }
  }

}
