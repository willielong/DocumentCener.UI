
/****   request.js   ****/
// 导入axios
import axios from 'axios'
//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: "http://192.168.0.105:82/api/",
  // 超时时间 单位是ms，这里设置了3s的超时时间
  timeout: 5 * 1000,
  // 在向服务器发送请求前，序列化请求数据
  transformRequest: [function (data) {
    data = JSON.stringify(data)
    return data
  }],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [function (data) {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }], headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      "Data-Type": "json"
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
      "Data-Type": "json"
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
  },
})
// 2.请求拦截器
service.interceptors.request.use(config => {
  return  config;
  }, error => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
  return response
}, error => {
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
       error.response.statusText = '错误请求'
        break;
      case 401:
       error.response.statusText = '未授权，请重新登录'
        break;
      case 403:
       error.response.statusText = '拒绝访问'
        break;
      case 404:
       error.response.statusText = '请求错误,未找到该资源'
        break;
      case 405:
       error.response.statusText = '请求方法未允许'
       break;
        case 415:
       error.response.statusText = '请求数据类型错误'
        break;
      case 408:
       error.response.statusText = '请求超时'
        break;
      case 500:
       error.response.statusText = '服务器端出错'
        break;
      case 501:
       error.response.statusText = '网络未实现'
        break;
      case 502:
       error.response.statusText = '网络错误'
        break;
      case 503:
        error.response.statusText = '服务不可用'
        break;
      case 504:
        error.response.statusText = '网络超时'
        break;
      case 505:
        error.response.statusText = 'http版本不支持该请求'
        break;
      default:
        error.response.statusText = `连接错误${error.response}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      error.response.statusText = '服务器响应超时，请刷新当前页'
    }
    error.response.statusText= '连接服务器失败'
  }

  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)
})
//4.导入文件
export default service
