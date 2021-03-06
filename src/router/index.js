import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../components/backlogin')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../components/Home'),
      children: [{
        path: 'wenzhang',
        name: 'Wenzhang',
        component: () => import('../components/Wenzhang')
      },
        {
          path: 'wenti',
          name: 'Wenti',
          component: () => import('../components/Wenti'),
        },
        {
          path: '/emp',
          name: 'Emp',
          component: () => import('../components/employee')
        },{
          path: '/usercenter',
          name: 'Usercenter',
          component: () => import('../components/usercente')
        },
        {
          path: '/account',
          name: 'Account',
          component: () => import('../components/Account')
        }
      ]

    },
    {
      path: '/*',
      component: () => import('../components/404')
    }
  ]
})
