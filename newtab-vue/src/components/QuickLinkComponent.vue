<script setup lang="ts">
import type { QuickLinkType } from '@/types/QuickLinkType'
import FaviconViewComponent from './FaviconViewComponent.vue'
import { ref, type Ref } from 'vue'
import { ContextMenu, Dialog, Button } from 'primevue'
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
    command: openDeleteDialog,
  },
])

// Confirm Delete Dialog
function openDeleteDialog() {
  showDeleteDialog.value = true
}

const showDeleteDialog: Ref<boolean> = ref(false)
</script>

<template>
  <div :onclick="openLink" class="link-object" @contextmenu="showContextMenu" aria-haspopup="true">
    <FaviconViewComponent :url="props.quickLink.url" />
    <div class="link-name">{{ linkName() }}</div>
  </div>

  <ContextMenu ref="ctxMenu" :model="contextMenuItems" />

  <Dialog
    v-model:visible="showDeleteDialog"
    modal
    header="Delete Link"
    :style="{ width: '25rem' }"
    :draggable="false"
  >
    <div class="d-content">
      <FaviconViewComponent :url="props.quickLink.url" />
      <div class="d-text">
        <div class="d-link-name">
          {{ props.quickLink.name }}
        </div>

        <div class="d-link">
          {{ props.quickLink.url }}
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Confirm" severity="danger" />
      <Button label="Cancel" severity="secondary" outlined />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.link-object {
  text-align: center;
  cursor: pointer;
  padding: 0.75em 1em;
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

.d-content {
  display: flex;
  align-items: center;
  gap: 1em;
}

.d-link-name {
  color: var(--p-primary-400);
  font-weight: 600;
  font-size: 1.2em;
}

.d-link {
  color: var(--p-surface-500);
  // font-size: 0.8em;
}
</style>
