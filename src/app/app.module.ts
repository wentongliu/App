import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BaseComponentModule} from "./base/baseComponent/baseComponent.module";
import {EventCanDeactivate } from "./base/baseFilter/CanDeactivate/TestPageCanDeactivate";
import {HttpService} from "./base/baseService/Http-service";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule, JsonpModule} from "@angular/http";
import {StorageProvider} from "./base/baseProvider/storage";
import {CameraProvider} from "./base/baseProvider/camera";
import {RecordProvider} from "./base/baseProvider/RecordProvider";
import {AppService} from "./base/baseService/app.service";
import {AppVersion} from "@ionic-native/app-version/ngx";
import {MediaCapture} from "@ionic-native/media-capture/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {NativeService} from "./base/baseService/NativeService";
import {MineDateHelper} from "./base/baseService/MineDateHelper";
import {LocalNotificationHelper} from "./base/baseService/LocalNotificationHelper";
import {GPS_worker} from "./base/baseService/GPS_worker";
import {LocationHelper} from "./base/baseService/LocationHelper";
import {LocalNotifications} from "@ionic-native/local-notifications/ngx";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import {CallNumber} from "@ionic-native/call-number/ngx";
import {QRScanner} from "@ionic-native/qr-scanner/ngx";
import {Screenshot} from "@ionic-native/screenshot/ngx";
import {PhotoLibrary} from "@ionic-native/photo-library/ngx";
import {Base64ToGallery} from "@ionic-native/base64-to-gallery/ngx";
import {FileTransfer} from "@ionic-native/file-transfer/ngx";
import {Media} from "@ionic-native/media/ngx";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {File} from "@ionic-native/file/ngx";
import {TestPageModule} from "./tab2/test/test.module";
import {TabsPageModule} from "./tabs/tabs.module";
import {Modal, ModalServiceComponent} from "ng-zorro-antd-mobile";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [ModalServiceComponent],
  imports: [
    TabsPageModule,
    BaseComponentModule ,
    TestPageModule,
    HttpClientModule, HttpModule, JsonpModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    Modal,
    Camera,
    CameraProvider,
    StorageProvider,
    EventCanDeactivate,
    HttpService,
    RecordProvider,
    AppService,
    File,
    AppVersion,
    FileTransfer,
    Media,
    InAppBrowser,
    MediaCapture,
    FileOpener,
    NativeService,
    MineDateHelper,
    LocalNotificationHelper,
    GPS_worker,
    LocationHelper,
    LocalNotifications,
    AndroidPermissions,
    CallNumber,
    QRScanner,
    Screenshot,
    PhotoLibrary,
    Base64ToGallery,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
