<script setup lang="ts">
import { columns } from './components/columns'
import DataTable from '../tasks/components/DataTable.vue'
import UserNav from '../tasks/components/UserNav.vue'
import { userListSchema } from './data/schema'
// import { UsersDialogs } from './components/users-dialogs'

import { users } from './data/users'
const userList = userListSchema.parse(users)
</script>

<template>
  <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">User List</h2>
        <p class="text-muted-foreground">Manage your users and their roles here.</p>
      </div>
      <div class="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
    <DataTable :data="userList" :columns="columns" />
  </div>
  <!-- <UsersDialogs /> -->
</template>
