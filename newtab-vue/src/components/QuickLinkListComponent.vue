<script setup lang="ts">
import QuickLinkConfigService from '@/data/QuickLinkConfigService'
import QuickLinkComponent from './QuickLinkComponent.vue'
import { inject } from 'vue'

const quickLinkConfigService = inject<QuickLinkConfigService>('quickLinkConfigService')
</script>

<template>
  <!-- List of Links -->
  <div class="flex gap-3 flex-wrap" v-if="quickLinkConfigService != null">
    <QuickLinkComponent
      v-for="item in quickLinkConfigService.links.value"
      :key="item.url"
      :quick-link="item"
    />
  </div>
</template>
