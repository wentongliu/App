import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StringTruncatePipe} from "./stringtruncate/stringtruncate.pipe";
import { PercentagePipe } from './percentage/percentage.pipe';
import { TimeInteralPipe } from './internationaltime/time-interal.pipe';
/**
 * 同意管理pipe管道
 * @type {[StringTruncatePipe,PercentagePipe,TimeInteralPipe]}
 */
export  const pipe=[
  StringTruncatePipe,
  PercentagePipe,
  TimeInteralPipe
]

@NgModule({
  declarations: [pipe],
  exports:[pipe],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
