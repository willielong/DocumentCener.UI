import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/icon/iconfont.css'
import './assets/icon/iconfont.js'

createApp(App).use(store).use(router).mount('#app')
