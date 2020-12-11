<script>
import axios from "axios";
import { Message } from "element-ui";
const api = "http://192.168.0.105:82/api/";
const v2 = 2.0;
const v1 = 1.0;
const currversion = 2.0;
let version;
function setVersion(ver) {
  version = ver;
}
///创建带token的请求
function request(paramerter) {
  var axios_instance = axios.create({
    // config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
    transformRequest: [
      function(data) {
        if (data != null && data != undefined) {
          data = JSON.stringify(data);
          return data;
        }
      },
    ],
    // 设置Content - Type
    headers: {
      "Content-Type": paramerter.contentType,
      "Data-Type": paramerter.dataType,
      Authorization: "Bearer " + window.localStorage.getItem("account_token"),
      "api-version": version || v1,
    },
  });
  return axios_instance;
}
///将返回参数封装完成
function CommPromise(res) {
  return new Promise((resolve, reject) => {
    res.then(
      (response) => {
        if (response.data.status) {
          resolve(response.data);
        } else {
          Message({
            showClose: true,
            message: response.data.message,
            type: "error",
          });
        }
      },
      (err) => {
        if (err && err.response) {
          $AlertErrorr(err.response);
          setTimeout(() => {
            if (err.response.status == 401) {
              window.location.href = "/";
            }
          }, 1500);
          reject(err.response);
          console.log(err);
        } else {
          Message({
            showClose: true,
            message: "接口内部服务错误",
            type: "error",
          });
        }
      }
    );
  });
}
///将返回参数封装完成
function CommDownloadPromise(res, filename) {
  res.then(
    (response) => {
      if (response.status) {
        const data = response.data;
        let url = window.URL.createObjectURL(data); // 将二进制文件转化为可访问的url
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = filename; //这里后台写什么后缀名格式，你就写什么
        a.click(); // 模拟点击下载
        window.URL.revokeObjectURL(url);
      } else {
        Message({
          showClose: true,
          message: response.data.message,
          type: "error",
        });
      }
    },
    (err) => {
      if (err && err.response) {
        $AlertErrorr(err.response);
        setTimeout(() => {
          if (err.response.status == 401) {
            window.location.href = "/";
          }
        }, 1500);
        console.log(err);
      } else {
        Message({
          showClose: true,
          message: "接口内部服务错误",
          type: "error",
        });
      }
    }
  );
}
///封装错误信息
function $AlertErrorr(response) {
  let statusText = "";
  // 1.公共错误处理
  // 2.根据响应码具体处理
  switch (response.status) {
    case 400:
      statusText = "请求失败，参数错误";
      break;
    case 401:
      statusText = "未授权，请重新登录";
      break;
    case 403:
      statusText = "拒绝访问";
      break;
    case 404:
      statusText = "请求错误,未找到该资源";
      break;
    case 405:
      statusText = "请求方法未允许";
      break;
    case 415:
      statusText = "请求数据类型错误";
      break;
    case 408:
      statusText = "请求超时";
      break;
    case 500:
      statusText = Setting500Error(response.data);
      break;
    case 501:
      statusText = "网络未实现";
      break;
    case 502:
      statusText = "网络错误";
      break;
    case 503:
      statusText = "服务不可用";
      break;
    case 504:
      statusText = "网络超时";
      break;
    case 505:
      statusText = "http版本不支持该请求";
      break;
    default:
      statusText = `连接错误:${response.statusText}`;
  }
  Message({
    showClose: true,
    message: statusText,
    type: "error",
  });
}
function Setting500Error(res) {
  return res.message;
}

var http = {
  $setVer: function(ver) {
    setVersion(ver);
  },
  ///POST数据请求
  $Post: function(model, url, contentType, dataType) {
    ///初始化请求
    var paramerter = new Object();
    paramerter.contentType = contentType ?? "application/json";
    paramerter.dataType = dataType ?? "json";
    var post = request(paramerter);
    var res = post({
      url: api + url,
      method: "POST",
      data: model,
    });
    return CommPromise(res);
  },
  ///Get数据请求
  $Get: function(model, url, contentType, dataType) {
    ///初始化请求
    var paramerter = new Object();
    paramerter.contentType = contentType ?? "application/json";
    paramerter.dataType = dataType ?? "json";
    var get = request(paramerter);
    var res = get({
      url: api + url,
      method: "GET",
      data: model ?? "",
    });
    return CommPromise(res);
  },
  ///删除数据请求
  $Delete: function(model, url) {
    ///初始化请求
    var paramerter = new Object();
    paramerter.contentType = "application/json";
    paramerter.dataType = "json";
    var dl = request(paramerter);
    var res = dl({
      url: api + url,
      method: "DELETE",
      data: model ?? "",
    });
    return CommPromise(res);
  },
  ///删除数据请求
  $Put: function(model, url, contentType, dataType) {
    ///初始化请求
    var paramerter = new Object();
    paramerter.contentType = contentType ?? "application/json";
    paramerter.dataType = dataType ?? "json";
    var put = request(paramerter);
    var res = put({
      url: api + url,
      method: "PUT",
      data: model ?? "",
    });
    return CommPromise(res);
  }, ///POST数据请求
  $download: function(model, url, filename) {
    ///初始化请求
    var paramerter = new Object();
    paramerter.contentType = "application/json";
    paramerter.dataType = "json";
    var post = request(paramerter);
    var res = post({
      url: api + url,
      method: "POST",
      data: model,
      responseType: "blob", // 设置响应数据类型
    });
    return CommDownloadPromise(res, filename);
  },
  v2: v2, ///v2版
  v1: v1, ///v1版
  currversion: currversion, ///当前版
};

///导出方法
export default {
  ///POST请求
  $Post: function(model, url, contentType, dataType) {
    return http.$Post(model, url, contentType, dataType);
  },
  ///Get请求
  $Get: function(model, url, contentType, dataType) {
    return http.$Get(model, url, contentType, dataType);
  },
  ///Delete 请求
  $Delete: function(model, url) {
    return http.$Get(model, url);
  },
  ///put请求
  $Put: function(model, url, contentType, dataType) {
    return http.$Put(model, url, contentType, dataType);
  },
  $download: function(model, url, filename) {
    return http.$download(model, url, filename);
  },
  $setVer: function(version) {
    http.$setVer(version);
  },
  api: api,
  v2: http.v2,
  v1: http.v1,
  currversion: currversion, ///当前版
};
</script>
