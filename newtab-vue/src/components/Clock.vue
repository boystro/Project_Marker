<script setup lang="ts">
import { onMounted, ref, computed, type Ref, type VNodeRef } from 'vue'
import type { DateStyleType, Hour12Type, TimeStyleType } from '@/types/DateTimeFormatOptionTypes'

import { ContextMenu, Card, Dialog, Select, Button, FloatLabel } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'

const currentTime: Ref<Date> = ref(new Date())

// Date Time Options
const timeStyle: Ref<TimeStyleType> = ref('short')
const hour12: Ref<Hour12Type> = ref(true)
const dateStyle: Ref<DateStyleType> = ref('full')

const formattedTime = computed(() => {
  const t = currentTime.value
  return t.toLocaleTimeString('en-IN', {
    timeStyle: timeStyle.value,
    hour12: hour12.value,
  })
})

const formattedDate = computed(() => {
  const t = currentTime.value
  return t.toLocaleDateString('en-IN', {
    dateStyle: dateStyle.value,
  })
})

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

// Context Menu Controls

const ctxMenu: Ref = ref()
const items: Ref<MenuItem[]> = ref([
  {
    label: 'Edit Time',
    icon: 'pi pi-clock',
    command: toggleEditTimeDialog,
  },
  {
    label: 'Edit Date',
    icon: 'pi pi-calendar',
    command: toggleEditDateDialog,
  },
])

function openCtxMenu(event: Event) {
  ctxMenu.value.show(event)
}

// Edit Dialog Controls
const editTimeDialogVisible: Ref<boolean> = ref(false)
const editTimeFormat: Ref<DateStyleType> = ref(timeStyle.value)
function toggleEditTimeDialog() {
  editTimeDialogVisible.value = !editTimeDialogVisible.value
}

const editDateDialogVisible: Ref<boolean> = ref(false)
const editDateFormat: Ref<DateStyleType> = ref(dateStyle.value)
function toggleEditDateDialog() {
  editDateDialogVisible.value = !editDateDialogVisible.value
}

const editValues = ref([
  {
    name: 'Short',
    code: 'short',
  },
  {
    name: 'Full',
    code: 'full',
  },
  {
    name: 'Long',
    code: 'long',
  },
  {
    name: 'Medium',
    code: 'medium',
  },
])

// Edit Controls
</script>

<template>
  <Card id="dt-card" @contextmenu="openCtxMenu" aria-haspopup="true">
    <template #title>
      <div class="time">
        {{ formattedTime }}
      </div>
    </template>
    <template #content>
      <div class="date">
        {{ formattedDate }}
      </div>
    </template>
  </Card>

  <!-- Edit Context Menu -->
  <ContextMenu ref="ctxMenu" :model="items" />

  <!-- Time Edit Dialog Box -->
  <Dialog
    v-model:visible="editTimeDialogVisible"
    modal
    header="Edit Time"
    :style="{ width: '25rem' }"
    :draggable="false"
  >
    <div class="time">
      {{ formattedTime }}
    </div>

    <template #footer>
      <FloatLabel class="flex-1" variant="in">
        <Select
          input-id="select-time-edit"
          v-model="editTimeFormat"
          :options="editValues"
          optionLabel="name"
          option-value="code"
          placeholder="Select Time Format"
          fluid
          autofocus
        ></Select>
        <label for="select-time-edit">Select Time Format</label>
      </FloatLabel>

      <Button label="Save" icon="pi pi-check" iconPos="right"></Button>
    </template>
  </Dialog>

  <!-- Dadte Edit Dialog Box -->
  <Dialog
    v-model:visible="editDateDialogVisible"
    modal
    header="Edit Date"
    :style="{ width: '25rem' }"
    :draggable="false"
  >
    <div class="date">
      {{ formattedDate }}
    </div>

    <template #footer>
      <FloatLabel class="flex-1" variant="in">
        <Select
          input-id="select-date-edit"
          v-model="editDateFormat"
          :options="editValues"
          optionLabel="name"
          option-value="code"
          placeholder="Select Date Format"
          fluid
          autofocus
        ></Select>
        <label for="select-date-edit">Select Date Format</label>
      </FloatLabel>
      <Button label="Save" icon="pi pi-check" iconPos="right"></Button>
    </template>
  </Dialog>
</template>

<style lang="scss">
#dt-card {
  width: fit-content;
}

.time {
  font-size: 2.5em;
  font-weight: 600;
  text-align: center;
}

.date {
  font-size: 1.2em;
  text-align: center;
  font-weight: 200;
}
</style>
