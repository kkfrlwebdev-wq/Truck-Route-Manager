import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import LoginPage from '@/views/LoginPage.vue'
import RouteSheetForm from '@/views/RouteSheetForm.vue'

import { isAuthenticated, isRouteAvailable } from './helpers'

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      requireAuth: false,
      useInMenu: true
    },
    component: HomeView
  },
   {
    path: '/sheet',
    name: 'sheet',
    meta: {
      requireAuth:  true,
      useInMenu: true
    },
    component:RouteSheetForm
    },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false,
      useInMenu: false
    },
    component: LoginPage
  },
 {
    path: '/:path(.*)*',
    name: 'page-not-found',
    meta: {
      requireAuth: false
    },
    component: () => import('../views/PageNotFound.vue')
  }
 

]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  if (to.meta?.requireAuth) {
    if (!(await isAuthenticated()))
      return {
        name: 'login'
      }
    if (!isRouteAvailable(to)) {
      return {
        name: 'page-not-found'
      }
    }
  }
})

export default router
