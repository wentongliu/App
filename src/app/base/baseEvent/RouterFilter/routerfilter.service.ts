import {Injectable, OnInit, OnDestroy} from '@angular/core';
import {Events} from "@ionic/angular";
import {Router} from "@angular/router";
/**
 * 事件监听，用法继承RouterfilterService类，在子类的constructor中super()中传入events，routers即可
 */
@Injectable({
  providedIn: 'root'
})
export class RouterfilterService  {
  event:Events;
  router:Router;
  constructor(public events:Events,public routers:Router) {
      this.event=events;
      this.router=routers;
  }


  ionViewWillEnter(){
    this.Routerfilter();
  }

  //监听Routerfilter事件
  Routerfilter(){
    this.event.publish("Routerfilter",()=>{

    });
  }



}
