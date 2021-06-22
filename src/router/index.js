import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import('@/components/task/Task.vue')
  },
  {
    path: '/task/:id',
    name: 'TaskId',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const userAuth = firebase.auth().currentUser?.uid
  if (!userAuth && to.name !== 'Login') next({ name: 'Login' })
  else next()
})

export default router
