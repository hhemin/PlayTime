import Vue from '../common'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from '../../App.vue'
import store from '../../store'
import Day from '../../day/Index.vue'
import Menu from '../../components/menu/Index.vue'

Vue.use(Router)

const router = new Router(
  {
    mode: 'history',
    routes: [{
      path: '/',
      name: 'Menu',
      component: Menu,
      children:[
        {
          path:'/day',
          name:'Day',
          component:Day,
        }
      ]
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
