import { createRouter, createWebHistory } from 'vue-router'
import user from '@/router/user'

export const routes = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { layout: 'SimpleLayout' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/CartView.vue'),
    meta: { layout: 'DefaultLayout' },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/UserView.vue'),
    meta: { layout: 'DefaultLayout' },
    children: user,
  },
]

export const initRouter = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })

  return router
}
