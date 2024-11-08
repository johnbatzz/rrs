import Vue from 'vue'
import VueRouter from 'vue-router'
import PublicRoutes from './public'
Vue.use(VueRouter)

const routes = [...PublicRoutes]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router