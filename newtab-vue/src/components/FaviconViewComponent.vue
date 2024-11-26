<script setup lang="ts">
const props = defineProps<{ url: string }>()

const iconFetch = 'https://www.google.com/s2/favicons?domain_url=${hostname}&sz=64'

function src() {
  if (props.url.length == 0) return 'icon128.png'
  return iconFetch.replace('${hostname}', props.url)
}
</script>

<template>
  <img :src="src()" class="favicon-view" />
</template>

<style lang="scss">
.favicon-view {
  height: 64px;
  width: 64px;
  border-radius: var(--p-border-radius-md);
}
</style>
