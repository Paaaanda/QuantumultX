let cookieName = `CookieCordCloud`;
let headerCookie = $request.headers["Cookie"];
let historyCookie = $prefs.valueForKey(cookieName);
if (historyCookie) {
  if (historyCookie != headerCookie) {
    var cookie = $prefs.setValueForKey(headerCookie, cookieName);
    if (!cookie) {
      $notify("更新CordCloud Cookie失败‼️‼️", "", "请重试");
    } else {
      $notify("更新CordCloud Cookie成功🎉", "", "无需禁用脚本，仅cookie改变时才会重新获取");
    }
  }
} else {
  var cookie = $prefs.setValueForKey(headerCookie, cookieName);
  if (!cookie) {
    $notify("首次写入CordCloud Cookie失败‼️‼️", "", "请重试");
  } else {
    $notify("首次写入CordCloud Cookie成功🎉", "", "无需禁用脚本，仅cookie改变时才会重新获取");
  }
}
$done({});