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
          name: 'Dashboard',
          component: () => import('@/views/dashboard/Example.vue'),
        },
        // {
        //   path: '/blankPage',
        //   name: 'blankPage',
        //   component: () => import('@/views/BlankPage.vue'),
        // },
        {
          path: '/tasks',
          name: 'Tasks',
          component: () => import('@/views/tasks/Example.vue'),
        },
        {
          path: '/chats',
          name: 'Chats',
          component: () => import('@/views/chats'),
        },
        {
          path: '/users',
          name: 'Users',
          component: () => import('@/views/users/index.vue'),
        },
        {
          path: '/',
          name: 'Settings1',
          // component: () => import('@/views/users/index.vue'),
          children: [
            {
              path: '/settings',
              name: 'Settings',
              component: () => import('@/views/forms/Account.vue'),
            }
          ]
        },
        // settings
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
