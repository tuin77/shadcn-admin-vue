import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/Main.vue'
import login from '@/views/login.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect: "",
      component: Main,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Example.vue'),
        },
        {
          path: '/dashboard1',
          name: 'dashboard1',
          component: () => import('@/views/dashboard1.vue'),
        },
        {
          path: '/tasks',
          name: 'tasks',
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
