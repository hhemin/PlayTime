import Vue from 'vue'
import Router from 'vue-router'

const Menu = () => import(/* webpackChunkName: "Menu" */'@/components/menu/Index.vue')
const Home = () => import(/* webpackChunkName: "Home" */'@/home/Index.vue')
const List = () => import(/* webpackChunkName: "List" */'@/list/Index.vue')
const Detail = () => import(/* webpackChunkName: "Detail" */'@/detail/Index.vue')
const Add = () => import(/* webpackChunkName: "Add" */'@/add/Index.vue')
const Day = () => import(/* webpackChunkName: "Day" */'@/day/Index.vue')
const Login = () => import(/* webpackChunkName: "Login" */'@/login/Index.vue')
const Me = () => import(/* webpackChunkName: "Me" */'@/me/Index.vue')
const Register = () => import(/* webpackChunkName: "Register" */'@/register/Index.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Menu',
      component: Menu,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: '/me',
          name: 'Me',
          component: Me,
        },
        {
          path: '/day',
          name: 'Day',
          component: Day,
        }
      ]
    },
    // {
    //   path: '/(home|index)?',
    //   name: 'Home',
    //   component: Home,
    // }, {
    //   path: '/index.html',
    //   name: 'HomeHtml',
    //   component: Home,
    // }, {
    //   path: '/test/(home|index)',
    //   name: 'HomeTest',
    //   component: Home,
    // },
    {
      path: '/test/list/:id',
      name: 'List',
      component: List,
    }, {
      path: '/test/detail/:id',
      name: 'Detail',
      component: Detail,
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/add',
      name: 'Add',
      component: Add,
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ],
})
