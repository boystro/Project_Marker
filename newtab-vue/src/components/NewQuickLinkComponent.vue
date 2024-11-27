<script setup lang="ts">
import { Button, InputText, FloatLabel } from 'primevue'

import QuickLinkConfigService from '@/data/QuickLinkConfigService'
import { inject, ref } from 'vue'
import type { QuickLinkType } from '@/types/QuickLinkType'

const quickLinkConfigService = inject<QuickLinkConfigService>('quickLinkConfigService')
const linkName = ref('')
const linkUrl = ref('')

function addLink(event: Event) {
  event.preventDefault()
  console.log(linkName, linkUrl)
  const newLink: QuickLinkType = {
    name: linkName.value,
    url: linkUrl.value,
  }
  if (quickLinkConfigService != null) quickLinkConfigService.addLink(newLink)
}
</script>

<template>
  <form @submit="addLink">
    <FloatLabel variant="in">
      <InputText v-model="linkName" id="in-link-name" autocomplete="off"></InputText>
      <label for="in-link-name">Link Name</label>
    </FloatLabel>
    <FloatLabel variant="in">
      <InputText v-model="linkUrl" id="in-link-url" autocomplete="off"></InputText>
      <label for="in-link-url">Link URL</label>
    </FloatLabel>
    <Button type="submit" value="submit" label="Add" icon="pi pi-plus"></Button>
  </form>
</template>
