import Vue from 'vue'
import Router from 'vue-router'
import AccountList from '@/page/account_list/index'
import AccountDetails from '@/page/account_details/index'
import Login from '@/page/login/index'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/',
      redirect: '/accountList'
    },{
      path: '/accountList',
      name: 'AccountList',
      component: AccountList
    },{
      path: '/accountDetails',
      name: '/AccountDetails',
      component: AccountDetails
    }
  ]
})
router.beforeEach((to, from, next) => {
  const token = IOT.getUserItems('TOKEN')
  if(!token) {
    if(to.path !== '/login'){
      return next({path: '/login'})
    }else{
      next()
    }
  } else {
    if(to.path === '/login'){
      return next({path: '/'})
    }
    next()
  }
})

export default router

