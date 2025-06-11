<script setup lang="ts">
import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
import { RouterView, RouterLink } from 'vue-router'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

defineProps<{
  items: {
    title: string
    url?: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>General</SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in items"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <template v-if="item.items?.length">
            <CollapsibleTrigger as-child>
              <SidebarMenuButton :tooltip="item.title">
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
                <ChevronRight
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                  <SidebarMenuSubButton as-child>
                    <RouterLink :to="subItem.url" custom v-slot="{ href, navigate, isExactActive }">
                      <a
                        :href="href"
                        @click="navigate"
                        :class="
                          isExactActive && subItem.url !== '#'
                            ? 'bg-[hsla(160,100%,37%,0.2)] '
                            : 'inactiveClass'
                        "
                      >
                        <span>{{ subItem.title }} </span>
                      </a>
                    </RouterLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </template>

          <SidebarMenuButton v-else-if="item.url" :tooltip="item.title" as-child>
            <RouterLink :to="item.url" custom v-slot="{ href, navigate, isExactActive }">
              <a
                :href="href"
                @click="navigate"
                :class="
                  isExactActive && item.url !== '#'
                    ? 'bg-[hsla(160,100%,37%,0.2)] '
                    : 'inactiveClass'
                "
              >
                <component :is="item.icon" v-if="item.icon" />
                <span>{{ item.title }}</span>
              </a>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
