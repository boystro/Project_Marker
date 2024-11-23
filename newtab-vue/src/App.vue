<script setup lang="ts">
import { Button } from 'primevue'
import Clock from './components/ClockComponent.vue'
import GoogleSearch from './components/GoogleSearchComponent.vue'
import { provide } from 'vue';
import DateTimeConfigService from './data/DateTimeConfigService';

const dateTimeConfigService = new DateTimeConfigService()
provide('dateTimeConfigService', dateTimeConfigService);

</script>

<template>
  <Clock />
  <GoogleSearch />
  <!-- <RouterView /> -->
</template>
