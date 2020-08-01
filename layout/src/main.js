import Vue from 'vue'
import KboneUI from 'kbone-ui'
import 'kbone-ui/lib/weui/weui.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './static/css/index.css'

Vue.config.productionTip = false
Vue.use(KboneUI)

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
