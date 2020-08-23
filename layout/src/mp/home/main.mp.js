import Vue from '../common'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from '../../App.vue'
import store from '../../store'
import Home from '../../home/Index.vue'
import Me from '../../me/Index.vue'
import Add from '../../add/Index.vue'
import Login from '../../login/Index.vue'
import Register from '../../register/Index.vue'
import Editor from '../../editor/Index.vue'
// import Menu from '../../components/menu/Index.vue'

Vue.use(Router)
/**
 * 要跳转的都要导入这里
 * */ 
const router = new Router(
  {
    mode: 'history',
    routes: [{
      path: '/',
      name: 'Home',
      component: Home,
    },{
      path: '/me',
      name: 'Me',
      component: Me
    },{
      path: '/add',
      name: 'Add',
      component: Add
    },{
      path: '/login',
      name: 'Login',
      component: Login,
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/editor',
      name: 'Editor',
      component: Editor
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
