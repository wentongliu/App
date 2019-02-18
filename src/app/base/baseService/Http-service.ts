import {ChangeDetectorRef, Component, Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";

@Injectable()
export class HttpService {//211.149.225.177:8111
  httpurl='http://192.168.1.6:8080/';
  httpTjd='http://restapi.amap.com/v3/direction/driving';
  httpCity='http://restapi.amap.com/v3/place/text';//根据输入的城市内容查询具体的城市名
  key='42819360a0e9289d171f423f4ea9d794';//web服务的key，与其他key不一样

  constructor(public http: HttpClient) {
  }

  GETTJD(start,end,callback ?: (res: any, error: any) => void): void  {
    this.http.get('' + this.httpTjd + '?key='+this.key+ '&origin='+start+'&destination='+end+'&extensions=all&output=json&waypoints=16&strategy=10').subscribe(data =>
      { callback && callback(data, null);},
      err =>{callback && callback(null, err);}
    )
  }

  GETCity(cityName,callback ?: (res: any, error: any) => void): void  {
    this.http.get('' + this.httpCity + '?key='+this.key+ '&keywords='+cityName+'&children=1&offset=1&page=1&extensions=all').subscribe(data =>
      { callback && callback(data, null);},
      err =>{callback && callback(null, err);}
    )
  }



  GET(urlmethod , callback ?: (res: any, error: any) => void): void  {
    this.http.get('' + this.httpurl + '' + urlmethod + '').subscribe(data =>
      { callback && callback(data, null);},
      err =>{callback && callback(null, err);}
    )
  }

  //Common post method  post请求参数序列化
  POST(data, urlmethod , callback ?: (res: any, error: any) => void): void  {
    // let headers = new Headers({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
    this.http.post('' + this.httpurl + '' + urlmethod + '', this.toQueryString(data), {headers})
      .subscribe(data =>
        { callback && callback(data, null);},
        err =>{callback && callback(null, err);}
      )
  }

  //Common post method  post可以提交json参数，参数没有使用toQueryString序列化
  POST2(data, urlmethod , callback ?: (res: any, error: any) => void): void  {
    // let headers = new Headers({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    this.http.post('' + this.httpurl + '' + urlmethod + '', data, {headers})
      .subscribe(data =>
        { callback && callback(data, null);},
        err =>{callback && callback(null, err);}
      )
  }

  POSTForm(data, urlmethod, callback ?: (res: any, error: any) => void): void   {

    const headers = new HttpHeaders().set("Content-Type", "multipart/form-data; charset=utf-8");
    //const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    this.http.post('' + this.httpurl + '' + urlmethod + '', data, {})
      .subscribe(data =>
        { callback && callback(data, null);},
        err =>{callback && callback(null, err);}
      )
  }

  //post请求参数序列化
  // POST(data, urlmethod) {
  //
  //   const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
  //   return this.http.post('' + this.httpurl + '' + urlmethod + '', this.toQueryString(data), {headers})
  //     .map(res => res);
  // }
  //参数序列化
  private toQueryString(obj) {
    let result = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        result = result.concat(queryValues);
      } else {
        result.push(this.toQueryPair(key, values));
      }
    }
    return result.join('&');
  }
  //参数序列化
  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

}
