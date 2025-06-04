<script setup lang="ts">
import type { AvatarImageProps } from 'reka-ui'
import { AvatarImage } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<AvatarImageProps & { alt?: string }>()
</script>

<template>
  <AvatarImage data-slot="avatar-image" v-bind="props" class="aspect-square size-full">
    <slot />
  </AvatarImage>
</template>
