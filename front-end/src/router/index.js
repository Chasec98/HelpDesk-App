import Vue from 'vue'
import VueRouter from 'vue-router'

//import pages
import Home from '../pages/Home.vue'
import Settings from '../pages/Settings.vue'
import Login from '../pages/Login.vue'
import Profile from '../pages/Profile.vue'
import Dashboard from '../pages/Dashboard.vue'
import Search from '../pages/Search'
//import verifyLogin from './verify'

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
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '*',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

/*
router.beforeEach((to,from,next)=>{
  if(to.name == 'login'){
    next()
  }
  else{
    verifyLogin().then(response => {
      if(response){
        next()
      }
      else{
        next({name:'login'})
      }
    })
  }
})
*/

export default router
