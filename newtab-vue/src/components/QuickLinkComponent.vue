<script setup lang="ts">
import type { QuickLinkType } from '@/types/QuickLinkType'
import FaviconViewComponent from './FaviconViewComponent.vue'
import { ref, type Ref } from 'vue'
import { ContextMenu } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'

const props = defineProps<{ quickLink: QuickLinkType }>()

function openLink() {
  const url = props.quickLink.url
  console.log('Opening', url, '...')
  window.location.replace(url)
}

function linkName() {
  if (props.quickLink.name) return props.quickLink.name
  if (props.quickLink.url) {
    if (props.quickLink.url.length > 15) return props.quickLink.url.slice(0, 12) + '...'
  }
  return 'no-name'
}

// Delete Context Menu
const ctxMenu: Ref = ref()
function showContextMenu(event: Event) {
  ctxMenu.value.show(event)
}

const contextMenuItems: Ref<MenuItem[]> = ref([
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => (showDeleteDialog.value = true),
  },
])

// Confirm Delete Dialog
const showDeleteDialog = ref(false)
</script>

<template>
  <div :onclick="openLink" class="link-object" @contextmenu="showContextMenu" aria-haspopup="true">
    <FaviconViewComponent :url="props.quickLink.url" />
    <div class="link-name">{{ linkName() }}</div>
  </div>

  <ContextMenu ref="ctxMenu" :model="contextMenuItems" />

  <Dialog v-model:visible="showDeleteDialog">
    <template> This is a wonderful dialog </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.link-object {
  text-align: center;
  cursor: pointer;
  padding: 0.75em 1.5em;
  border-radius: var(--p-border-radius-xl);
  background: transparent;
  transition:
    200ms ease border,
    200ms ease background;

  &:hover {
    background: var(--p-surface-800);
    color: var(--p-primary-400);
  }
}

.link-name {
  font-size: 0.8em;
}
</style>
