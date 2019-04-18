import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '../config/evn'

const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const regist = r => require.ensure([], () => r(require('@/pages/regist')), 'regist')
const index = r => require.ensure([], () => r(require('@/pages/index/index')), 'index')

Vue.use(Router)

export default new Router({
  mode: routerMode,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    }
  ]
})
