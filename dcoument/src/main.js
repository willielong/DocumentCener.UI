import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from './comm/common.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css'
import './assets/icon/iconfont.js'
import CryptoAES from './comm/CryptoAES.vue'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.use(ElementUI)
Vue.prototype.common=common;
Vue.prototype.aes=CryptoAES;