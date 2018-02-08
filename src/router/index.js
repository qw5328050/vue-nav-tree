import Vue from 'vue'
import Router from 'vue-router'
import navBar from '@/components/nav-bar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'navBar',
      component: navBar
    }
  ]
})
