import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/AppHeader.component';
import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";



@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
    CommonModule,NgZorroAntdMobileModule
  ],
  exports:[AppHeaderComponent,NgZorroAntdMobileModule]
})
export class BaseComponentModule { }
