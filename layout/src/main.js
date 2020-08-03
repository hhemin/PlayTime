import Vue from 'vue'
import KboneUI from 'kbone-ui'
import 'kbone-ui/lib/weui/weui.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import './static/css/index.css'

import Screen from '../src/components/Screen/index'

Vue.config.productionTip = false
Vue.use(KboneUI)
Vue.use(Screen)

sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  Screen,
  render: h => h(App),
})
