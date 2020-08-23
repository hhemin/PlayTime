import Vue from 'vue'
import Router from 'vue-router'

// const Menu = () => import(/* webpackChunkName: "Menu" */'@/components/menu/Index.vue')
const Home = () => import(/* webpackChunkName: "Home" */'@/home/Index.vue')
const List = () => import(/* webpackChunkName: "List" */'@/list/Index.vue')
const Detail = () => import(/* webpackChunkName: "Detail" */'@/detail/Index.vue')
const Add = () => import(/* webpackChunkName: "Add" */'@/add/Index.vue')
const Day = () => import(/* webpackChunkName: "Day" */'@/day/Index.vue')
const Login = () => import(/* webpackChunkName: "Login" */'@/login/Index.vue')
const Me = () => import(/* webpackChunkName: "Me" */'@/me/Index.vue')
const Register = () => import(/* webpackChunkName: "Register" */'@/register/Index.vue')
const Editor = () => import(/* webpackChunkName: "Editor" */'@/editor/Index.vue')
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'Menu',
    //   component: Menu,
    //   children: [
    //     {
    //       path: '/',
    //       name: 'Home',
    //       component: Home,
    //       meta: {
    //         Login: true,
    //         Active: true,
    //       },
    //     },
    //     {
    //       path: '/me',
    //       name: 'Me',
    //       component: Me,
    //       meta: {
    //         Login: true,
    //         Active: true,
    //       },
    //     },
    //     {
    //       path: '/day',
    //       name: 'Day',
    //       component: Day,
    //       meta: {
    //         Login: true,
    //         Active: true,
    //       },
    //     }
    //   ]
    // },
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
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        Login: true,
        Active: true,
      },
    },
    {
      path: '/me',
      name: 'Me',
      component: Me,
      meta: {
        Login: true,
        Active: true,
      },
    },
    {
      path: '/day',
      name: 'Day',
      component: Day,
      meta: {
        Login: true,
        Active: true,
      },
    },
    {
      path: '/test/list/:id',
      name: 'List',
      component: List,
      meta: {
        Login: true,
        Active: true,
      },
    }, {
      path: '/test/detail/:id',
      name: 'Detail',
      component: Detail,
      meta: {
        Login: true,
        Active: true,
      },
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        Active: true,
      }
    }, {
      path: '/add',
      name: 'Add',
      component: Add,
      meta: {
        Login: true,
        Active: true,
      },
    }, {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        Active: true,
      }
    }, {
      path: '/editor',
      name: 'Editor',
      component: Editor,
      meta: {
        Login: true,
      }
    }
  ],
})


router.beforeEach((to, from, next) => {
  console.log(to)
  next()
})

export default router
