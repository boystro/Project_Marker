<script setup lang="ts">
import { ref } from 'vue'
import { InputText, IconField, InputIcon, Message, Tag } from 'primevue'

const searchVal = ref('')

function search() {
  const url = `https://www.google.com/search?q=${searchVal.value}`
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <IconField class="w-full">
      <InputIcon class="pi pi-google" />
      <InputText
        v-model="searchVal"
        type="text"
        placeholder="Google Search"
        variant="filled"
        fluid
        v-on:keypress.enter="search"
      />
    </IconField>
    <Message size="small" severity="secondary" variant="simple" v-if="searchVal?.length > 0">
      Press <span class="key">Enter</span> to search...
    </Message>
  </div>
</template>

<style lang="scss" scoped>
.key {
  color: var(--p-primary-500);
  font-weight: bold;
}
</style>
