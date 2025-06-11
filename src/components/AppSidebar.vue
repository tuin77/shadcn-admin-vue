<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  CircleHelp,
  LayoutDashboard,
  ClipboardList,
  MessagesSquare,
  Users,
} from 'lucide-vue-next'
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'tuincn@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: ClipboardList,
    },
    {
      title: 'Chats',
      url: '/chats',
      icon: MessagesSquare,
    },
    {
      title: 'Users',
      url: '/users',
      icon: Users,
    },

    {
      title: 'Settings',
      icon: BookOpen,
      items: [
        {
          title: 'Profile',
          url: '/settings',
        },
        {
          title: 'Account',
          url: '/settings/account',
        },
        {
          title: 'Appearance',
          url: '/settings/appearance',
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
        },
        {
          title: 'Display',
          url: '/settings/display',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Settings',
      url: '/blank-page',
      icon: Settings2,
      //   items: [
      //     {
      //       title: 'General',
      //       url: '#',
      //     },
      //     {
      //       title: 'Team',
      //       url: '#',
      //     },
      //     {
      //       title: 'Billing',
      //       url: '#',
      //     },
      //     {
      //       title: 'Limits',
      //       url: '#',
      //     },
      //   ],
    },
    {
      name: 'Help Center',
      url: '/help-center',
      icon: CircleHelp,
    },
  ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
