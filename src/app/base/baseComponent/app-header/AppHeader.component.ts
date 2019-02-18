import {OnInit,  Component, Input, Output, EventEmitter, HostBinding} from "@angular/core";
import {Events} from "@ionic/angular";
import {Router} from "@angular/router";
/**
 * 公共组件,需要在页面导入AppHeaderComponent，html上直接使用app-header标签
 */
@Component({
  selector: 'app-header',
  templateUrl: 'AppHeader.component.html',
  styleUrls: ['AppHeader.component.scss']
})
export class AppHeaderComponent  implements  OnInit{

  @HostBinding('style.z-index') style = 1000;//最大层为1000
  @Input() json:any;
  @Output() callback:EventEmitter<any>=new EventEmitter();

  constructor(public event:Events,public router:Router){
    this.callback.emit("6666");
  }


  ngOnInit(){
    console.log("通用组件");
  }

}
