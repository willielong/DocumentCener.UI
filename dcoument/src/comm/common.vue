<script>
import req from "./httpbase.vue";
import { Message } from 'element-ui';
const http = {
    ///POST请求
  $Post: function(model, url, contentType, dataType) {
    return req.$Post(model, url, contentType, dataType);
  },
  ///Get请求
  $Get: function(model, url, contentType, dataType) {
    return req.$Get(model, url, contentType, dataType);
  },
  ///Delete 请求
  $Delete: function(model, url) {
    return req.$Post(model, url);
  },
  ///put请求
  $Put: function(model, url, contentType, dataType) {
    return req.$Put(model, url, contentType, dataType);
  },
  $mxAlert:function(msg,type){
     Message({
          showClose: true,
          message: msg,
          type: type
        });
  },
  api:req.api,
};
export default http;
</script>
