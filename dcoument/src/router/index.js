import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: index
  },
  {
    path: '/docedit',
    name: 'document-edit',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/doc/docedit.vue')
    
  },{
    path: '',
    name: '主页',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home/Index.vue'),
    children:[{
      path:"/home",
      name:"/home",
      component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    }]
    
  },]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
