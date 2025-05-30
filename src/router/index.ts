import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/Main.vue'
import login from '@/views/login.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Main,
      name: 'home',
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Example.vue'),
        },
        {
          path: '/blankPage',
          name: 'blankPage',
          component: () => import('@/views/BlankPage.vue'),
        },
        {
          path: '/table',
          name: 'table',
          component: () => import('@/views/tasks/Example.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ],
})

export default router
