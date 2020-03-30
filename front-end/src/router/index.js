import Vue from 'vue'
import VueRouter from 'vue-router'

//import pages
import Home from '../pages/Home.vue'
import Settings from '../pages/Settings.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Dashboard from '../pages/Dashboard.vue'

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
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path:'/dashboard',
    name:'dashboard',
    component: Dashboard
  },
  {
    path: '*',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
