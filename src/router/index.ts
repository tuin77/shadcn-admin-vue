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
          path: '/settings',
          name: 'Settings',
          // 父路由组件，若不需要展示特定内容，可使用空组件
          component: () => import('@/views/forms/FormsLayout.vue'),
          children: [
            {
              path: '',
              name: 'ProfileForm',
              component: () => import('@/views/forms/ProfileForm.vue'),
            },
            {
              path: 'account',
              name: 'Account',
              component: () => import('@/views/forms/AccountForm.vue'),
            },
            {
              path: 'appearance',
              name: 'Appearance',
              component: () => import('@/views/forms/AppearanceForm.vue'),
            },
            {
              path: 'notifications',
              name: 'Notifications',
              component: () => import('@/views/forms/NotificationsForm.vue'),
            },
            {
              path: 'display',
              name: 'Display',
              component: () => import('@/views/forms/DisplayForm.vue'),
            },
          ]
        },
        // {
        //   path: '/settings',
        //   name: 'SettingsAccount',
        //   component: () => import('@/views/forms/Account.vue'),
        // },
        // {
        //   path: '/settings/account',
        //   name: 'SettingsAppearance',
        //   component: () => import('@/views/forms/Appearance.vue'),
        // }

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
