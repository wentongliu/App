/**
 * Created by fanxing on 2018/6/11.
 */
var onDeviceReady = function() {
  document.addEventListener("jpush.receiveRegistrationId", function (event) {
    // alert("receiveRegistrationId" + JSON.stringify(event));
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      localStorage.setItem("iosId",event.registrationId);
    }  else if (/(Android)/i.test(navigator.userAgent))
      {  //判断Android
        localStorage.setItem("androidId",event.registrationId);
      }
  }, false)

  initiateUI();
};

var getRegistrationID = function() {
  window.JPush.getRegistrationID(onGetRegistrationID);
  //获取设备id
};

var onGetRegistrationID = function(data) {
  try {
    console.log("JPushPlugin:registrationID is " + data);
    if (data.length == 0) {
      var t1 = window.setTimeout(getRegistrationID, 1000);
    }
    console.log(data);
  } catch (exception) {
    console.log(exception);
  }
};

var onTagsWithAlias = function(event) {
  try {
    console.log("onTagsWithAlias");
    var result = "result code:" + event.resultCode + " ";
    result += "tags:" + event.tags + " ";
    result += "alias:" + event.alias + " ";
    console.log(result);
  } catch (exception) {
    console.log(exception)
  }
};

var onOpenNotification = function(event) {
  try {
    if (device.platform == "Android") {
    } else {
    }
   console.log("open Notification:" + alertContent);
  } catch (exception) {
    console.log("JPushPlugin:onOpenNotification" + exception);
  }
};

var onReceiveNotification = function(event) {
  try {
    var alertContent;
      var extra;
      var title;
      var url;
      var data;
    if (device.platform == "Android") {
        alertContent = event.alert;
        extra=event.extras;
        title=event.title;
        url=extra.key1;
        data=extra.key2;
    } else {
        alertContent = event.aps.alert;
        extra=event.aps.extras;
        title=event.aps.title;
        url=extra.key1;
        data=extra.key2;
    }
    console.log(alertContent);
  } catch (exception) {
    console.log(exception)
  }
};

var onReceiveMessage = function(event) {
  try {
    var message;
    if (device.platform == "Android") {
      message = event.message;
    } else {
      message = event.content;
    }
    console.log(message);
  } catch (exception) {
    console.log("JPushPlugin:onReceiveMessage-->" + exception);
  }
};

var initiateUI = function() {
  try {
    window.JPush.init();
    window.JPush.setDebugMode(true);
    window.setTimeout(getRegistrationID, 1000);

    if (device.platform != "Android") {
      window.JPush.setApplicationIconBadgeNumber(0);
    }
    console.log("设置了");
  } catch (exception) {
    console.log(exception);
  }
};

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("jpush.openNotification", onOpenNotification, false);
document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
