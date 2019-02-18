import { Injectable } from '@angular/core';

/*
  app缓存工具类，直接使用get和set即可，不再需要json转换
*/
@Injectable()
export class StorageProvider {

  constructor() {
    console.log('Hello StorageProvider Provider');
  }
  //localStorage

  set(key,value){

    localStorage.setItem(key,JSON.stringify(value));  /*对象转换成字符串*/
  }

  get(key){
    return JSON.parse(localStorage.getItem(key));   /*字符串转换成对象*/
  }
  remove(key){

    localStorage.removeItem(key);
  }

}
