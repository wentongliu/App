import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage  implements OnInit{
  isSave:boolean=false;
  constructor( ) {

  }

  back(){
    this.isSave=true;
  }

  ionViewDidLeave(){
    this.isSave=false;
  }


  leaveTip() {
    if(this.isSave){
      return true ;
    }
    else{
      return false ;
    }
  }

  ngOnInit() {
  }

}
