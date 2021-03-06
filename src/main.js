import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './http'

import App from './App.vue'
import cookie from 'vue-cookie'
import VueRouter from 'vue-router'
import router from './router.js'
import Moment from 'moment'
import store from './store'

import './assets/icon/iconfont.css'

Vue.use(ElementUI)

Vue.use(cookie)
Vue.use(VueRouter)

Vue.prototype.$moment = Moment

Vue.prototype.$axios = axios;
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  axios
})
