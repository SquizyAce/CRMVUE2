import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',    // использование / вместо #
  base: process.env.BASE_URL,
  routes: [
    {                    // роуты к сайтам
      path: '/',
      name: 'Home',
      meta: {layout: 'main', auth: true, main: true},
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      meta: {layout: 'empty'},
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/bill',
      name: 'Bill',
      meta: {layout: 'empty'},
      component: () => import('@/views/Bill.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {layout: 'empty'},
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/tenant',
      name: 'Tenant',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/Tenant.vue')
    },
    {
      path: '/tenant/:userId',
      name: 'TenantEdit',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/TenantEdit.vue')
    },
    {
      path: '/rate',
      name: 'Rate',
      meta: {layout: 'main', auth: true},
      component: () => import('@/views/Rate.vue')
    },
    {
      path: '/home/:apartamentId',
      name: 'Apartament',
      meta: {layout: 'main', auth: true, main: true},
      component: () => import('@/views/ApartamentEdit.vue')
    },
    {
      path: '/home/:apartamentId/:year',
      name: 'Apartament',
      meta: {layout: 'main', auth: true, main: true},
      component: () => import('@/views/Apartament.vue')
    },
       
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const rAuth = to.matched.some(record => record.meta.auth)
  if (rAuth && !currentUser) {
    next('/login?messege=login')
  } else {
    next()
  }
})

export default router
