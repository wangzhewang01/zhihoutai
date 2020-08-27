import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../components/backlogin')
    },{
      path:'/home',
      name:'Home',
      component:()=>import('../components/Home'),
      children: [
        {
          path: '/emp',
          name: 'Emp',
          component: () => import('../components/employee')
        },{
          path: '/usercenter',
          name: 'Usercenter',
          component: () => import('../components/usercente')
        }
      ]
    },
    {
      path: '/*',
      component: () => import('../components/404')
    }
  ]
})
