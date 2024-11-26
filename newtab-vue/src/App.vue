<script setup lang="ts">
import { provide } from 'vue'
import Clock from './components/ClockComponent.vue'
import GoogleSearch from './components/GoogleSearchComponent.vue'
import DateTimeConfigService from './data/DateTimeConfigService'
import QuickLinkConfigService from './data/QuickLinkConfigService'
import NewQuickLinkComponent from './components/NewQuickLinkComponent.vue'
import QuickLinkListComponent from './components/QuickLinkListComponent.vue'

const dateTimeConfigService = new DateTimeConfigService()
provide('dateTimeConfigService', dateTimeConfigService)

const quickLinkConfigService = new QuickLinkConfigService()
provide('quickLinkConfigService', quickLinkConfigService)
</script>

<template>
  <Clock />
  <GoogleSearch />
  <NewQuickLinkComponent />
  <QuickLinkListComponent />
  <!-- <RouterView /> -->
</template>
