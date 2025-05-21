<script setup lang="ts">
// import type { DefaultTheme } from 'vitepress/theme'
// import { withBase } from 'vitepress'
declare function withBase(path: string): string

type ThemeableImage =
  | string
  | { src: string; alt?: string; [prop: string]: any }
  | { light: string; dark: string; alt?: string; [prop: string]: any }

defineOptions({ inheritAttrs: false })
// console.log("DefaultTheme",DefaultTheme)

defineProps<{
  image: ThemeableImage
  alt?: string
}>()
</script>

<template>
  <template v-if="image">
    <img
      v-if="typeof image === 'string' || 'src' in image"
      class="VPImage"
      v-bind="typeof image === 'string' ? $attrs : { ...image, ...$attrs }"
      :src="typeof image === 'string' ? image : image.src"
      :alt="alt ?? (typeof image === 'string' ? '' : image.alt || '')"
    />
    <template v-else>
      <VPImage class="dark" :image="image.dark" :alt="image.alt" v-bind="$attrs" />
      <VPImage class="light" :image="image.light" :alt="image.alt" v-bind="$attrs" />
    </template>
  </template>
</template>

<style scoped>
html:not(.dark) .VPImage.dark {
  display: none;
}
.dark .VPImage.light {
  display: none;
}
</style>
