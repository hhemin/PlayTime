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
      meta: {
        Login: true
      }
    },{
      path: '/me',
      name: 'Me',
      component: Me,
      meta: {
        Login: true
      }
    },{
      path: '/add',
      name: 'Add',
      component: Add,
      meta: {
        Login: true
      }
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
      component: Editor,
      meta: {
        Login: true
      }
    }],
  }
)

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta.Login) {
    if (!localStorage.getItem('token')) {
      return router.push({
        path: '/login'
      })
    }
  }
  return next()
})


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
