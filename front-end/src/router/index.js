import Vue from 'vue'
import VueRouter from 'vue-router'

//import pages
import Home from '../pages/Home.vue'
import Settings from '../pages/Settings.vue'
import Login from '../pages/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '*',
    name: 'home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
