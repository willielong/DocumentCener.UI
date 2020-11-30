<script>
import req from "./httpbase.vue";
import { Message } from "element-ui";
const http = {
  ///POST请求
  $Post: function(model, url, ver, contentType, dataType) {
    req.$setVer(ver || req.v1);
    return req.$Post(model, url, contentType, dataType);
  },
  ///Get请求
  $Get: function(model, url, ver, contentType, dataType) {
    req.$setVer(ver || req.v1);
    return req.$Get(model, url, contentType, dataType);
  },
  ///Delete 请求
  $Delete: function(model, url, ver) {
    req.$setVer(ver || req.v1);
    return req.$Post(model, url);
  },
  ///put请求
  $Put: function(model, url, ver, contentType, dataType) {
    req.$setVer(ver || req.v1);
    return req.$Put(model, url, contentType, dataType);
  },
  $mxAlert: function(msg, type) {
    Message({
      showClose: true,
      message: msg,
      type: type
    });
  },
  $Download: function(model, url, filename, ver) {
    req.$setVer(ver || this.defaultVer);
    return req.$download(model, url, filename);
  },
  api: req.api,
  v2: req.v2, ///当前接口版本
  currversion: req.currversion ///当前版
};
export default http;
</script>
