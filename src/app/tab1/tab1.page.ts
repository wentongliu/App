import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../base/baseService/app.service";
import {Modal, Toast} from "ng-zorro-antd-mobile";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  json:any;
  name:string="bdjsakdbsjkadbsjadbajs大健康的123";
  percentage:string="0.382";
  time:any=new Date();



  constructor(public appservice:AppService,public modal:Modal){
    this.json={title:"tab1",class:"tab1",name:"tab1"};
  }

  ionViewWillEnter(){
  }


}
