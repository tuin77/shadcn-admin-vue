<script setup lang="ts">
import { useRoute } from 'vue-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Item {
  title: string
  href: string
}

const $route = useRoute()

const sidebarNavItems: Item[] = [
  {
    title: 'Profile',
    href: '/settings',
  },
  {
    title: 'Account',
    href: '/settings/account',
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
  },
  {
    title: 'Notifications',
    href: '/settings/notifications',
  },
  {
    title: 'Display',
    href: '/settings/display',
  },
]
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <router-link v-for="item in sidebarNavItems" :key="item.href" :to="item.href">
      <Button
        variant="ghost"
        :class="
          cn(
            'w-full text-left justify-start',
            $route.path === `${item.href}` && 'bg-muted hover:bg-muted',
          )
        "
      >
        {{ item.title }}
      </Button>
    </router-link>
  </nav>
</template>
