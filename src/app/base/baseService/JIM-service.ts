import {Injectable} from '@angular/core';
import {Md5} from "ts-md5/dist/md5";
import {AppService} from "./app.service";
import {MineDateHelper} from "./MineDateHelper";
import {Platform} from "@ionic/angular";

/**
 * 群聊接口，暂无优化
 */
declare  let JMessage:any;
declare  let $:any;
@Injectable()
export class JIMservice{
  private JIM:any;
  private obj:any={username: "", password: '',nickname:''};//聊天用户信息
  private appid:string="dddc524e36ba497c0455e8ef";//官网申请的key
  private appkey:string="0b623c3a94b3104e6311efa1";
  private rand:string=this.randomString(22);
  private times:string=new Date().getTime()+"";
  private signature=Md5.hashStr("appkey="+this.appid+"&timestamp="+this.times+"&random_str="+this.rand+"&key="+this.appkey);

  constructor(platform: Platform,public mdh:MineDateHelper,public appService:AppService) {
    var that=this;
    platform.ready().then(() => {
      that.JIM=new JMessage();
    });

  }

  addGroupKeeper(gid,name1){
    this.JIM.addGroupKeeper({
      'gid' : gid,
      'member_usernames' : [{'username':name1}]
    }).onSuccess(function(data) {
      //data.code 返回码
      //data.message 描述
    }).onFail(function(data) {
      //data.code 返回码
      //data.message 描述
    });
  }


  ionViewDidLoad(){

  }

  //初始化
  init(fun){
    var that=this;
    setTimeout(function () {
      that.JIM.init({
        appkey:that.appid,
        random_str:that.rand,
        signature:that.signature,
        timestamp:that.times,
        flag:1
      }).onSuccess(function (data) {
        fun(data).then();
      }).onFail(function (data) {
        fun(data).then();
      });
    },2000)
  }

//获取用户信息
  getMyInfo(username,fun){
    var that=this;
    //获取用户信息
    that.JIM.getUserInfo({
      'username':username,
      'appkey':that.appid
    }).onSuccess(function(data){
      fun(data).then();
    }).onFail(function (data) {
      fun(data).then();
    });
  }

//用户登录
  userLogin(username,password,nickname,fun,array,scorll,tt,gid){
    var that=this;
    that.obj.password=password;
    that.obj.username=username;
    that.JIM.login(that.obj).onSuccess(function(da){
      console.log("登录成功");



      var da=da;
      if(tt){
      that.JIM.onSyncConversation(function(data) { //离线消息同步监听

         if(array!=null){
            data[0].msgs.map((item,index)=>{
              var content=item.content;

              var time=item.ctime_ms;
              var ct:any={gid:content.target_id,name:username,oname:content.from_id,nickname:content.from_name,context:content.msg_body.text,time:that.mdh.changeDateFormat2(time)};

              if(content.target_id==gid){
                array.push(ct);
              }
              if(index==(data[0].msgs.length-1)){
                setTimeout(function () {
                  window.location.hash='bot'+(array.length-1);
                },500);
              }
            });
         }
      });
      }

      that.JIM.onMsgReceive(function(data) {
        data = JSON.stringify(data);
        console.log('1msg_receive:' + data);

      });


      that.JIM.onEventNotification(function(data) {
        console.log('event_receive: ' + JSON.stringify(data));

      });


      that.JIM.onUserInfUpdate(function(data) {
        console.log('onUserInfUpdate : ' + JSON.stringify(data));

      });

      that.JIM.onSyncEvent(function(data) {
        console.log('onSyncEvent : ' + JSON.stringify(data));

      });

      that.JIM.onMsgReceiptChange(function(data){
        console.log('onMsgReceiptChange : ' + JSON.stringify(data));

      });

      that.JIM.onSyncMsgReceipt(function(data){
        console.log('onSyncMsgReceipt : ' + JSON.stringify(data));

      });

      that.JIM.onMutiUnreadMsgUpdate(function(data){
        console.log('onConversationUpdate : ' + JSON.stringify(data));

      });

      that.JIM.onTransMsgRec(function(data){
        console.log('onTransMsgRec : ' + JSON.stringify(data));
      });

      that.JIM.onRoomMsg (function(data){
        console.log('onRoomMsg  : ' + JSON.stringify(data));
      });

      fun(da).then();
      that.updateSelfInfo(nickname);
    }).onFail(function (data) {
      console.log("登录失败");
      fun(data).then();
    });
  }

  //注册用户
  register(username,password,nickname,fun,array,scorll,tt,gid){
    var that=this;
    that.obj.password=password;
    that.obj.username=username;
    that.obj.nickname=nickname;
    that.JIM.register(that.obj).onSuccess(function (data) {
      console.log("注册成功");
      that.userLogin(username,password,nickname,fun,array,scorll,tt,gid)
    }).onFail(function (data) {
      console.log("注册失败");
      that.userLogin(username,password,nickname,fun,array,scorll,tt,gid)
    });
  }

//获取会话列表
  getMessage(fun){
    this.JIM.getConversation().onSuccess(function(data) {
      fun(data).then();
    }).onFail(function(data) {
      fun(data).then();
    });
  }

  /**
   * 更新群会话,
   * @param gid
   * @param extras  {'key':'val','key2':'val2'}
   */
  updateAllConversation(gid,extras){
    return this.JIM.updateConversation({
      'gid' : gid,
      'extras' : extras
    });
  }


  /**
   *  群聊，未读数，
   *  gid 群id
   *  返回未读数
   */
  getUnreadAllMsgCnt(gid,fun){
    var count = this.JIM.getUnreadMsgCnt({
      'gid' : gid
    });
    fun(count).then();
  }

  // 重置群聊会话，
  resetUnreadCount(gid){
    return this.JIM.resetUnreadCount({
      'gid' : gid
    });
  }

// data.code 返回码
  // gid 目标 群
  // msg_ids 消息数组
// 接收方收到需要消息回执的消息，阅读后进行消息回执操作
  /**
   *
   * @param gid  群id
   * @param msg_id 消息数组   [1,2]
   */
  addGroupReceiptReport(gid,msg_id,fun){
    this.JIM.addGroupReceiptReport({
      'gid' : gid,
      'msg_id' : msg_id
    }).onSuccess(function(data,msg_ids){
      fun(msg_ids).then();
    }).onFail(function(data,msg_ids){
      fun(msg_ids).then();
    });
  }

  //
  //
  /**
   * 消息撤回
   * @param msg_id msg_ids 消息数组   [1]
   */
  msgRetract(msg_id){
    return this.JIM.msgRetract({
      'msg_id' : msg_id,
    }).onSuccess(function(data , msg) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }


  /**
   *群聊，发送文本消息
   * @param target_gid   //群组ID
   * @param target_gname  //接收者的展示名
   * @param content   //消息文本
   * @param extras    //附加字段,字典类型
   * @param at_list   //@用户列表：[{'username': 'name1', 'appkey': '跨应用必填，默认不填表示本应用'}],@ALL 直接空数组：[]
   */
  sendGroupMsg(target_gid,target_gname,content,extras,fun){
    this.JIM.sendGroupMsg({
      'target_gid' :target_gid,
      'target_gname' : target_gname,
      'content' :content,
      'extras' : extras
    }).onSuccess(function(data , msg) {
      fun(data,msg).then();
    }).onFail(function(data) {
      console.log(target_gid+","+target_gname+","+content);
      console.log("发送失败");
      console.log(data);
      fun(data).then();
    });
  }

  /** 创建群组
   * @param group_name //群组名
   * @param group_description //群组描述，
   */
  createGroup(group_name,group_description){
    return this.JIM.createGroup({
      'group_name' : group_name,
      'group_description' : group_description,
      'is_limit':true //是否是公开群
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }


  /**
   * 退出群组
   * @param gid 群id
   */
  exitGroup(gid){
    return this.JIM.exitGroup({
      'gid' : gid//群id
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }

  /**
   *添加群成员
   * @param gid
   * @param userArray [{'username':'name1'},{'username':'name2','appkey':'appkey2'}]
   */
  addGroupMembers(gid,userArray,fun){
    this.JIM.addGroupMembers({
      'gid': gid,
      'member_usernames':userArray
    }).onSuccess(function(data) {
      fun(data).then();
    }).onFail(function(data) {
      fun(data).then();
    });
  }

  /**
   * 删除群成员
   * gid 群id
   * member_usernames   [{'username':'name1'},{'username':'name2','appkey':'appkey2'}]
   */
  delGroupMembers(gid,member_usernames){
    return this.JIM.delGroupMembers({
      'gid' : gid,
      'member_usernames' : member_usernames
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }

  //获取群组列表
  getGroups(fun){
    this.JIM.getGroups().onSuccess(function(data) {
      console.log("获取群组成功");
      console.log(data);
      fun(data).then();
    }).onFail(function(data) {
      console.log("获取群组失败");
      console.log(data);
      fun(data).then();
    });
  }


  //获取群信息
  getGroupInfo(gid){
    return this.JIM.getGroupInfo({
      'gid' : gid
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }

  //更新群信息
  updateGroupInfo(gid,group_name,group_description){
    return this.JIM.updateGroupInfo({
      'gid' : gid,
      'group_name' :group_name,
      'group_description' :group_description
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }

  /**
   * 获取群成员
   */
  getGroupMembers(gid,fun){
    this.JIM.getGroupMembers({
      'gid' :gid
    }).onSuccess(function(data) {
      fun(data,gid).then();
    }).onFail(function(data) {
      fun(data,gid).then();
    });
  }

  updateSelfInfo(name){
    this.JIM.updateSelfInfo({
      'nickname' : name
    }).onSuccess(function(data) {

    }).onFail(function(data) {

    });
  }


  /**
   * 主动加群
   * gid群id
   * reason 加群愿意
   */
  joinGroup(gid,reason){
    return this.JIM.joinGroup({
      'gid' :gid,
      'reason' : reason
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }



  /**
   * 获取聊天室分页
   * @param start 首页为0
   */
  getAppkeyChatrooms(start){
    return this.JIM.getAppkeyChatrooms({
      'start' : start
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }


  /**
   * 获取已加入聊天室
   */
  getSelfChatrooms(){
    return this.JIM.getSelfChatrooms().onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }


  /**
   * 获取聊天室信息
   * @param id 聊天室id
   */
  getChatroomInfo(id){
    return this.JIM.getChatroomInfo({
      'id' : id
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }


  /**
   * 进入聊天室
   * @param id
   */
  enterChatroom(id){
    return this.JIM.enterChatroom({
      'id' : id
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }


  /**
   * 退出聊天室
   * @param id
   */
  exitChatroom(id){
    return this.JIM.exitChatroom({
      'id' : id
    }).onSuccess(function(data) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }


  /**
   * 发送文本消息
   * @param target_rid 目标 id
   * @param content 消息文本
   * @param extras 附加字段,字典类型
   */
  sendChatroomMsg(target_rid,content,extras){
    return this.JIM.sendChatroomMsg({
      'target_rid' : target_rid,
      'content' : content,
      'extras' : extras
    }).onSuccess(function(data,msg) {
      return data;
    }).onFail(function(data) {
      return data;
    });
  }

  //聊天消息实时监听
  onMsgReceive(fun){
    console.log("开始消息事件同步监听11111");
    var that=this;
    that.JIM.onMsgReceive(function(data) {
      console.log("开始消息事件同步监听");
      console.log(data);
      fun(data).then();
    });
  }


  //用户信息变更监听
  onUserInfUpdate(){
    return this.JIM.onUserInfUpdate(function(data) {
      return data;
    });
  }

  //业务事件监听
//被踢者收到该事件 ,不能同时登陆多个账号 event_type = 1
  //密码被修改，被迫下线示例：event_type = 2
  //退出群组事件示例：event_type = 9
  //添加群组成员事件示例：event_type = 10
  onEventNotification(fun){
    this.JIM.onEventNotification(function(data) {
      fun(data).then();
    });
  }

  //消息已读数变更事件实时监听
  onMsgReceiptChange(){
    return this.JIM.onMsgReceiptChange(function(data) {
      return data;
    });
  }

  //消息已读数变更事件同步监听
  onSyncMsgReceipt(){
    return this.JIM.onSyncMsgReceipt(function(data) {
      return data;
    });
  }

  //聊天室消息监听
  onRoomMsg(){
    return this.JIM.onRoomMsg(function(data) {
      return data;
    });
  }


  //退出登录
  userLayout(){
    this.JIM.loginOut();
  }

  //监听断线
  disconnect(){
    return this.JIM.onDisconnect(function(data){
      return data;
    });
  }

  //连接状态
  isConnect(){
    return this.JIM.isConnect();
  }

//登录状态
  islogin(){
    return this.JIM.isLogin();
  }

//随机数
  private randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}
