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
    path: '',
    name: '主页',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home/Index.vue'),
    children: [{
      path: "/file",
      name: "文档中心",
      component: () => import(/* webpackChunkName: "about" */ '../views/files/filecenter.vue')
    }, {
      path: "/org",
      name: "组织管理",
      component: () => import(/* webpackChunkName: "about" */ '../views/Organization/organization.vue')
    }, {
      path: "/personal",
      name: "员工管理",
      component: () => import(/* webpackChunkName: "about" */ '../views/Personal/personal.vue')
    }]
  }, {
    path: "/docedit",
    name: "document-edit",
    component: () => import(/* webpackChunkName: "about" */ '../views/files/docedit.vue')
  },]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
