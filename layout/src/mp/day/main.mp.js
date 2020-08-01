import Vue from '../common'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from '../../App.vue'
import store from '../../store'
import Day from '../../day/Index.vue'
import Footer from '../../common/Footer.vue'

Vue.use(Router)

const router = new Router(
  {
    mode: 'history',
    routes: [{
      path:'/',
      name:Footer,
      component: Footer,
      children:{
        path: '/Day',
        name: 'Day',
        component: Day,
      }
    }],
  }
)


export default function createApp() {
  const container = document.createElement('div')
  container.id = 'app'
  document.body.appendChild(container)

  Vue.config.productionTip = false

  sync(store, router)

  return new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
