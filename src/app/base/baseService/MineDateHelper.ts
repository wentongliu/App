import {Injectable} from '@angular/core';

/**
 * Generated class for the AddressSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**
 * 这个类用来处理日期遇到的各种问题
 */
@Injectable()
export class MineDateHelper {
  havaThirtyOneDays:any=[1,3,5,7,8,10,12];
  havaThirtyDays:any=[4,6,9,11];

  constructor(){

  }

  /**
   * 获取当前日期时间的字符串 yyyy-MM-DD HH:mm:ss
   */
  getNowDateTimeString():string{
    let nowDate:Date=new Date();
    return nowDate.getFullYear()+'-'+this.isAddZero(nowDate.getMonth()+1)
      +'-'+this.isAddZero(nowDate.getDate())
      +' '+this.isAddZero(nowDate.getHours())
      +':'+this.isAddZero(nowDate.getMinutes())
      +':'+this.isAddZero(nowDate.getSeconds());
  }

  /**
   * 获取当天日期 yyyy-MM-DD
   */
  getNowDateString():string{
    let nowDate:Date=new Date();
    return nowDate.getFullYear()+'-'+this.isAddZero(nowDate.getMonth()+1)
      +'-'+this.isAddZero(nowDate.getDate());
  }
  /**
   * 计算一个时间减去当前时间
   * @param timeStr
   */
  countTimeMinus(timeStr:string):number{
    let time = this.stringTimeToDate(timeStr).getTime();
    let now=new Date().getTime();
    return time-now;
  }

  /**
   * 从时间戳中获取小时
   * @param time
   */
  getTimeNumberToHour(time:number):string{
    let miao:number=time/1000;
    let fen:number=miao/60;
    let hour:number=fen/60;
    if(hour<1){
      return '00';
    }else {
      return this.isAddZero(parseInt(hour+''));
    }
  }

  /**
   * 从时间戳获取分
   * @param time
   */
  getTimeNumberToMinutes(time:number):string{
    let miao:number=time/1000;
    let fen:number=miao/60;
    let yuFen:number=fen%60;
    if(yuFen<1){
      return '00';
    }else {
      return this.isAddZero(parseInt(yuFen+''));
    }
  }

  /**
   * 从时间戳获取秒
   * @param time
   */
  getTimeNumberToSecond(time:number):string{
    let miao:number=time/1000;
    let yuMiao:number=miao%60;
    if(yuMiao<1){
      return '00';
    }else {
      return this.isAddZero(parseInt(yuMiao+''));
    }
  }
  /**
   * 字符串转Date（兼容模式）
   * @param {string} timeStr
   * @returns {Date}
   */
  stringTimeToDate(timeStr:string):Date{
    let resDate:Date;
    if(timeStr.indexOf(' ')!=-1){
      if(timeStr.indexOf("-")!=-1){
        let nyrArr:any=timeStr.split(' ')[0].split('-');
        let sfmArr:any=timeStr.split(' ')[1].split(':');
        resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],sfmArr[0],sfmArr[1],0,0);
      }
      if(timeStr.indexOf(".")!=-1){
        let nyrArr:any=timeStr.split(' ')[0].split('.');
        let sfmArr:any=timeStr.split(' ')[1].split(':');
        resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],sfmArr[0],sfmArr[1],0,0);
      }
      if(timeStr.indexOf("/")!=-1){
        let nyrArr:any=timeStr.split(' ')[0].split('/');
        let sfmArr:any=timeStr.split(' ')[1].split(':');
        resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],sfmArr[0],sfmArr[1],0,0);
      }
    }else {
      if(timeStr.indexOf("-")!=-1){
        let nyrArr:any=timeStr.split('-');
        resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],0,0,0,0);
      }
      if(timeStr.indexOf(".")!=-1){
        let nyrArr:any=timeStr.split('.');
        resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],0,0,0,0);
      }
      if(timeStr.indexOf("/")!=-1){
        let nyrArr:any=timeStr.split('/');
        resDate=new Date(nyrArr[0],nyrArr[1]-1,nyrArr[2],0,0,0,0);
      }
    }

    return resDate;
  }

  /**
   * 日期字符串获取月份
   * @param {string} dateStr
   * @returns {string}
   */
  getDayNumber(dateStr:string):string{
    let date:Date=this.stringTimeToDate(dateStr);
    return this.isAddZero(date.getDate());
  }

  /**
   * 日期字符串获取月份英文缩写
   * @param {string} dateStr
   * @returns {string}
   */
  getDayEnglish(dateStr:string):string{
    let date:Date=this.stringTimeToDate(dateStr);
    let month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[date.getMonth()];
  }
  /**
   * 时间戳转标准中国日期
   * @param {number} dateNumber
   * @returns {Date}
   */
  timeNumberToDate(dateNumber:number):Date{
    return new Date(dateNumber);
  }
  /**
   * 标准格式字符串 2018-05-15 21:10转  2018.05.15
   * @param {string} dateStr
   */
  stringToFormatDate(dateStr:string,isNeedYear:boolean):string{
    let date=new Date(dateStr);
    let resStr:string='';
    if(isNeedYear){
      resStr+=date.getFullYear()+'.'+this.isAddZero(date.getMonth()+1)+'.'+this.isAddZero(date.getDate());
    }else{
      resStr+=this.isAddZero(date.getMonth()+1)+'.'+this.isAddZero(date.getDate());
    }
    return resStr;
  }
  /**
   * 去掉分钟后面的单位“分”
   */
  delMinusFen(hourStr:string):string{
    hourStr=hourStr.replace('分','');
    return hourStr;
  }
  /**
   * 去掉小时后面的单位“时”
   */
  delHourShi(hourStr:string):string{
    if(hourStr.indexOf('时')!=-1){
      hourStr=hourStr.replace('时','');
    }
    return hourStr;
  }
  /**
   * 年月日日期转点格式  2018.05.16
   * @param {string} dateStr
   */
  nyrToDian(dateStr:string):string{
    dateStr=dateStr.replace('年','.');
    dateStr=dateStr.replace('月','.');
    dateStr=dateStr.replace('日','');
    return dateStr;
  }

  /**
   * 获取当前星期几之前有几个空格
   * @param {number} dayNumber
   * @returns {number}  空格数量
   */
  getWeekBeforeKon(dayNumber:number):number{
    let resNumber;
    switch(dayNumber){
      case 1:
        resNumber=0;
        break;
      case 2:
        resNumber=1;
        break;
      case 3:
        resNumber=2;
        break;
      case 4:
        resNumber=3;
        break;
      case 5:
        resNumber=4;
        break;
      case 6:
        resNumber=5;
        break;
      case 0:
        resNumber=6;
        break;
      default:
        break;
    }
    return resNumber;
  }

  /**
   * 比较两个日期的大小
   * @param {Date} date1
   * @param {Date} date2
   * @returns {number}
   */
  countDaxiao(date1:Date,date2:Date):boolean{
    let sjc1=date1.getTime();
    let sjc2=date2.getTime();
    if(sjc1>sjc2){
      return false;
    }
    return true;
  }




  /**
   * 计算两个日期之间相差多少天
   */
  countDayNumber(date1:Date,date2:Date):number{
    let sjc1=date1.getTime();
    let sjc2=date2.getTime();
    let countDays:number;
    if(sjc2>sjc1){
      countDays=(sjc2-sjc1)/(1000*60*60*24);
    }else{
      countDays=(sjc1-sjc2)/(1000*60*60*24);
    }
    return Math.floor(countDays);
  }

  /**
   * 计算两个日期之间相差多少小时
   */
  countShiNumber(date1:Date,date2:Date):number{
    let sjc1=date1.getTime();
    let sjc2=date2.getTime();
    let countDays:number;
    if(sjc2>sjc1){
      countDays=(sjc2-sjc1)/(1000*60*60);
    }else{
      countDays=(sjc1-sjc2)/(1000*60*60);
    }
    return Math.floor(countDays);
  }

  /**
   * 计算两个日期之间相差多少分
   */
  countFeneNumber(date1:Date,date2:Date):number{
    let sjc1=date1.getTime();
    let sjc2=date2.getTime();
    let countDays:number;
    if(sjc2>sjc1){
      countDays=(sjc2-sjc1)/(1000*60);
    }else{
      countDays=(sjc1-sjc2)/(1000*60);
    }
    return Math.floor(countDays);
  }

  /**
   * 为了显示美观，是否小于10在之前加0
   * @param {number} dayNumber
   * @returns {string}
   */
  isAddZero(dayNumber:number):string{
    let resStr:string;
    if(dayNumber<10){
      resStr='0'+dayNumber;
    }else{
      resStr=dayNumber+'';
    }
    return resStr;
  }
  /**
   * date.getDay()转中文星期
   * @param {number} day
   * @returns {string}
   */
  numberToWeek(day:number):string{
    let resStr:string;
    switch (day){
      case 1:
        resStr='周一';
        break;
      case 2:
        resStr='周二';
        break;
      case 3:
        resStr='周三';
        break;
      case 4:
        resStr='周四';
        break;
      case 5:
        resStr='周五';
        break;
      case 6:
        resStr='周六';
        break;
      case 0:
        resStr='周日';
        break;
    }
    return resStr;
  }

  numberToWeek2(day:number):string{
    let resStr:string;
    switch (day){
      case 1:
        resStr='星期一';
        break;
      case 2:
        resStr='星期二二';
        break;
      case 3:
        resStr='星期三';
        break;
      case 4:
        resStr='星期四';
        break;
      case 5:
        resStr='星期五';
        break;
      case 6:
        resStr='星期六';
        break;
      case 0:
        resStr='星期日';
        break;
    }
    return resStr;
  }

  /**
   * 创建60分钟列表
   * @returns {any}
   */
  createAllMinute():any{
    let newMinuteArr:any=[''];
    for(let i=0;i<60;i++){//懒得写60分钟
      if(i<10){
        newMinuteArr.push('0'+i+'分');
      }else{
        newMinuteArr.push(i+'分');
      }
    }
    newMinuteArr.push('');
    return newMinuteArr;
  }
  /**
   * 创建24小时
   * @returns {any}
   */
  createAllHour():any{
    let newHourArr:any=[''];
    for(let i=0;i<24;i++){//懒得写24小时
      if(i<10){
        newHourArr.push('0'+i+'时');
      }else{
        newHourArr.push(i+'时');
      }
    }
    newHourArr.push('');
    return newHourArr;
  }

  /**
   * 创建分钟列表，但是只有00和30
   * @returns {any}
   */
  createTwoMinute():any{
    let minuteArr:any=[];
    minuteArr.push('00分');
    minuteArr.push('30分');
    minuteArr.push('');
    minuteArr.push('');
    return minuteArr;
  }
  /**
   * 创建分钟滚动列表【当前时间以后的分钟数】
   * @param {Date} nowDate
   * @returns {any}
   */
  createMinuteList(nowDate:Date):any {
    let minuteArr:any=[];
    // minuteArr.push('');
    if(nowDate==null){
      for(let i=0;i<60;i++){//懒得写60分钟
        if(i<10){
          minuteArr.push('0'+i+'分');
        }else{
          minuteArr.push(i+'分');
        }
      }
    }else{
      for(let i=nowDate.getMinutes();i<60;i++){//懒得写60分钟
        if(i<10){
          minuteArr.push('0'+i+'分');
        }else{
          minuteArr.push(i+'分');
        }
      }
    }
    minuteArr.push('');
    minuteArr.push('');
    return minuteArr;
  }
  /**
   * 创建小时滚动列表【当前时间以后的小时，24小时制】
   * @param {Date} nowDate
   * @returns {any}
   */
  createHourList(nowDate:Date):any {
    let hourArr:any=[];
    if(nowDate==null){
      for(let i=0;i<24;i++){//懒得写24小时
        if(i<10){
          hourArr.push('0'+i+'时');
        }else{
          hourArr.push(i+'时');
        }
      }
    }else{
      for(let i=nowDate.getHours();i<24;i++){//懒得写24小时
        if(i<10){
          hourArr.push('0'+i+'时');
        }else{
          hourArr.push(i+'时');
        }
      }
    }
    hourArr.push('');//最后再添加一个啦占位，解决滚动存在的问题
    hourArr.push('');//最后再添加一个啦占位，解决滚动存在的问题
    return hourArr;
  }
  /**
   * 创建日期滚动列表
   * @param nowDate
   */
  createDateList(nowDate:Date):any{
    let nextMonth=1;
    let dateArr:any=[];
    // dateArr.push('');
    for(let i=nowDate.getDate();i<=nowDate.getDate()+30;i++){
      if(i>this.monthHavaDays(nowDate.getFullYear(),nowDate.getMonth())){
        if(nextMonth<=this.monthHavaDays(nowDate.getFullYear(),nowDate.getMonth())-nowDate.getDate()){
          if(nowDate.getMonth()==11){
            dateArr.push((nowDate.getFullYear()+1)+'年0'+1+'月'+this.isAddZero(nextMonth)+'日');
          }else{
            dateArr.push(nowDate.getFullYear()+'年'+this.isAddZero(nowDate.getMonth()+2)+'月'+this.isAddZero(nextMonth)+'日');
          }
          nextMonth++;
        }
      }else{
        dateArr.push(nowDate.getFullYear()+'年'+this.isAddZero(nowDate.getMonth()+1)+'月'+this.isAddZero(i)+'日');
      }
    }
    dateArr.push('');
    dateArr.push('');
    return dateArr;
  }
  /**
   * 年月日时间字符串转标准字符串
   * @param {string} dateStr
   * @returns {string}
   */
  stringToDatetimeStr(dateStr:string):string{
    if(dateStr.indexOf('年')!=-1){
      dateStr=dateStr.replace('年','-');
    }
    if(dateStr.indexOf('月')!=-1){
      dateStr=dateStr.replace('月','-');
    }
    if(dateStr.indexOf('日')!=-1){
      dateStr=dateStr.replace('日','');
    }
    if(dateStr.indexOf('时')!=-1){
      dateStr=dateStr.replace('时',':');
    }
    if(dateStr.indexOf('分')!=-1){
      dateStr=dateStr.replace('分','');
    }
    return dateStr;
  }

  /**
   * new Date()转年月日时间
   * @param {Date} matDate
   * @returns {string}
   */
  dateToFormatStr(matDate:Date):string{
    let resStr='';
    resStr+=matDate.getFullYear()+'年';
    resStr+=(matDate.getMonth()+1)+'月';
    resStr+=matDate.getDate()+'日 ';
    resStr+=matDate.getHours()+'时';
    resStr+=matDate.getMinutes()+'分';
    return resStr;
  }

  dateToFormatStr8(matDate:Date):string{
    let resStr='';
    resStr+=matDate.getFullYear()+'.';
    resStr+=(matDate.getMonth()+1)+'.';
    resStr+=matDate.getDate()+' ';
    resStr+=matDate.getHours()+':';
    resStr+=matDate.getMinutes()+'';
    return resStr;
  }

  dateToFormatStr2(matDate:Date):string{
    let resStr='';
    resStr+=matDate.getFullYear()+'-';
    resStr+=(matDate.getMonth()+1)+'-';
    resStr+=matDate.getDate()+' ';
    return resStr;
  }


  dateToFormatStr3(matDate:Date):string{
    let resStr='';
    resStr+=matDate.getHours()+'：';
    resStr+=matDate.getMinutes()+'';
    return resStr;
  }


  getNian(matDate:Date):string{
    let resStr='';
    resStr+=matDate.getFullYear();
    return resStr;
  }

  getYue(matDate:Date):string{
    let resStr='';
    resStr+=(matDate.getMonth()+1);
    return resStr;
  }

  dateToFormatStr4(matDate:Date):string{
    let resStr='';
    resStr+=(matDate.getFullYear())+'.';
    resStr+=(matDate.getMonth()+1)+'.';
    resStr+=matDate.getDate()+'';
    return resStr;
  }

  dateToFormatStr44(matDate:Date):string{
    let resStr='';
    resStr+=(matDate.getFullYear())+'-';
    if(((matDate.getMonth()+1)+"").length==1){
      resStr+="0"+(matDate.getMonth()+1)+'-';
    }else{
      resStr+=(matDate.getMonth()+1)+'-';
    }
    if((matDate.getDate()+"").length==1){
      resStr+="0"+matDate.getDate()+' ';
    }else{
      resStr+=matDate.getDate()+' ';
    }
    if((matDate.getHours()+"").length==1){
      resStr+="0"+matDate.getHours()+':';
    }else{
      resStr+=matDate.getHours()+':';
    }
    if((matDate.getMinutes()+"").length==1){
      resStr+="0"+matDate.getMinutes()+':';
    }else{
      resStr+=matDate.getMinutes()+':';
    }
    if((matDate.getSeconds()+"").length==1){
      resStr+="0"+matDate.getSeconds()+'';
    }else{
      resStr+=matDate.getSeconds()+'';
    }
    return resStr;
  }

  dateToFormatStr10(matDate:Date):string{
    let resStr='';
    resStr+=matDate.getDate();
    if(resStr.length==1){
      resStr="0"+resStr;
    }
    return resStr;
  }


  dateToFormatStr9(matDate:Date):string{
    let resStr='';
    resStr+=(matDate.getMonth()+1)+'/';
    resStr+=(matDate.getFullYear());
    return resStr;
  }
  /**
   * 年月日字符串转中国标准时间
   * @param {string} dateStr
   * @returns {any}
   */
  stringToDatetime(dateStr:string):any{
    if(dateStr.indexOf('年')!=-1){
      dateStr=dateStr.replace('年','-');
    }
    if(dateStr.indexOf('月')!=-1){
      dateStr=dateStr.replace('月','-');
    }
    if(dateStr.indexOf('日')!=-1){
      dateStr=dateStr.replace('日',' ');
    }
    if(dateStr.indexOf('时')!=-1){
      dateStr=dateStr.replace('时',':');
    }
    if(dateStr.indexOf('分')!=-1){
      dateStr=dateStr.replace('分','');
    }
    let datetime:any=new Date(dateStr);
    return datetime;
  }
  //平年28天、闰年29天
  /**
   * 获得每个月有多少天
   * @param {number} year
   * @param {number} month
   * @returns {number}
   */
  monthHavaDays(year:number,month:number):number{
    let isRunNina:boolean;//是否为闰年
    if(year%4==0){
      isRunNina=true;
    }else {
      isRunNina=false;
    }
    let monthDays=0;
    switch(month+1){
      case 1:
        monthDays=31;
        break;
      case 2:
        if(isRunNina){
          monthDays=29;
        }else{
          monthDays=28;
        }
        break;
      case 3:
        monthDays=31;
        break;
      case 4:
        monthDays=30;
        break;
      case 5:
        monthDays=31;
        break;
      case 6:
        monthDays=30;
        break;
      case 7:
        monthDays=31;
        break;
      case 8:
        monthDays=31;
        break;
      case 9:
        monthDays=30;
        break;
      case 10:
        monthDays=31;
        break;
      case 11:
        monthDays=30;
        break;
      case 12:
        monthDays=31;
        break;
    }
    return monthDays;
  }



  changeDateFormat(cellval):string{
  var dateVal = cellval + "";
  if (cellval != null) {
    var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    //return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    return date.getFullYear() + "-" + month + "-" + currentDate;
  }
}

  changeDateFormat3(cellval):string{
    var dateVal = cellval + "";
    if (cellval != null) {
      var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      //return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
      return  month + "." + currentDate;
    }
  }


  changeDateFormat33(cellval):string{
    var dateVal = cellval + "";
    if (cellval != null) {
      var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

       return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
    }
  }

  changeDateFormat2(cellval):string {
    var dateVal = cellval + "";
    if (cellval != null) {
      var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
      var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      return hours + ":" + minutes+":"+seconds;
    }
  }
  /*倒计时
  * date:String
  * X年X天
  * */
  countDowntime(date):String{
    var that=this;
    console.log(date)
    //结束时间
    var endDate = new Date(date);
    //当前时间
    var nowDate = new Date();
    console.log(nowDate.toString());
    //相差的总秒数
    var totalSeconds = (endDate.getTime()-nowDate.getTime())/1000;
    //年数
    var yaer=Math.floor(totalSeconds / (365*24*60*60));
    var modulo = totalSeconds % (60 * 60 * 24*365);
    //天数
    var days = Math.floor(modulo / (60 * 60 * 24));
    //取模（余数）
     modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
    var countDownDate=yaer+"年"+days+"天";
    return countDownDate;
  }




}
