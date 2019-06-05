import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
// import Login from '@/components/Login'
import HotCity from '@/components/HotCity'
import Weather from '@/components/Weather'

Vue.use(VueResource)
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/Weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/HotCity',
      name: 'HotCity',
      component: HotCity
    },
    {
      path: '/',
      name: 'Weather',
      component: Weather
    }
  ]
})
