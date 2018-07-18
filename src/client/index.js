import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/store'
import { http, axios } from './utils/http'
import service from './utils/service'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$ajax = http
Vue.prototype.$axios = axios
Vue.prototype.$service = service
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
