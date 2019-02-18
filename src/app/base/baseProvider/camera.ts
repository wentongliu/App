import {Injectable} from '@angular/core';
import {Camera} from '@ionic-native/camera/ngx';
import {ActionSheetController} from "@ionic/angular";


/**
 * 调用相机和图库插件
 */
@Injectable()
export class CameraProvider {

  number:any="";
  callbackA:any;

  constructor(private camera: Camera, public actionSheetCtrl: ActionSheetController) {
  }

  /**
   * 上传图片ActionSheet
   * @param val  随意的标识
   * @param callback 回调函数
   */
  async cameraActionSheet(val,callback) {
    this.number=val;
    this.callbackA=callback;

    let actionSheet = await this.actionSheetCtrl.create({
      header: '上传图片',
      buttons: [

        {
          text: '拍照',
          handler: () => {
            this.getPictureFromCamera();
          }
        },
        {
          text: '从相册选择',
          handler: () => {
            this.getPictureFromPhotoLibrary();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }



  getPictureFromCamera() {
    return this.getImage(this.camera.PictureSourceType.CAMERA, true);
  }

  getPictureFromPhotoLibrary() {
    return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }


  getPictureFromPhotoLibrary2(callbackA,index) {
    this.callbackA=callbackA;
    this.number=index;
    return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  /**
   * 该方法采用可选参数使其更加可定制 获取图片
   * @param pictureSourceType
   * @param {boolean} crop
   * @param {number} quality
   * @param {boolean} allowEdit
   * @param {boolean} saveToAlbum
   * @returns {Promise<any>}
   */
  getImage(pictureSourceType, crop = true, quality = 50, allowEdit = false, saveToAlbum = true) {
    const options = {
      quality,
      allowEdit,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: pictureSourceType,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: saveToAlbum
    };

    // If set to crop, restricts the image to a square of 600 by 600
    if (crop) {
      options['targetWidth'] = 600;
      options['targetHeight'] = 600;
    }

    return this.camera.getPicture(options).then(imageData => {
      const base64Image = 'data:image/png;base64,' + imageData;
      var param={data:base64Image,index:this.number};
      this.callbackA(param).then(()=>{});
      return base64Image;
    }, error => {
      console.log('CAMERA ERROR -> ' + JSON.stringify(error));
    });
  }

}
