import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import {BaseComponentModule} from "../base/baseComponent/baseComponent.module";
import {PipeModule} from "../base/basePipe/pipe.module";



@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    PipeModule,
    BaseComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
