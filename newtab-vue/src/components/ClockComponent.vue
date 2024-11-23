<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import type { DateStyleType, Hour12Type, TimeStyleType } from '@/types/DateTimeFormatOptionTypes'

import { ContextMenu, Card, Dialog, Select, Button, FloatLabel, Checkbox } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'

import TimeComponent from './TimeComponent.vue';
import DateComponent from './DateComponent.vue';
import DateTimeConfigService from '@/data/DateTimeConfigService';

const currentTime: Ref<Date> = ref(new Date())

const dateTimeConfigService = inject<DateTimeConfigService>('dateTimeConfigService')!

onMounted(() => {
  setInterval(() => currentTime.value = new Date(), 1000)
})

// Context Menu Controls
const ctxMenu: Ref = ref()
const items: Ref<MenuItem[]> = ref([
  {
    label: 'Edit Time',
    icon: 'pi pi-clock',
    command: showEditTimeDialog,
  },
  {
    label: 'Edit Date',
    icon: 'pi pi-calendar',
    command: showEditDateDialog,
  },
])

function openCtxMenu(event: Event) {
  ctxMenu.value.show(event)
}

// Edit Controls
const editHour12: Ref<Hour12Type> = ref(dateTimeConfigService.hour12.value)
const editTimeStyle: Ref<TimeStyleType> = ref(dateTimeConfigService.timeStyle.value)
const editDateStyle: Ref<DateStyleType> = ref(dateTimeConfigService.dateStyle.value)

// Edit Dialog Controls
const editTimeDialogVisible: Ref<boolean> = ref(false)
function showEditTimeDialog() {
  editHour12.value = dateTimeConfigService.hour12.value
  editTimeStyle.value = dateTimeConfigService.timeStyle.value
  editTimeDialogVisible.value = true
}

function saveTimeConfig() {
  dateTimeConfigService.hour12.value = editHour12.value;
  dateTimeConfigService.timeStyle.value = editTimeStyle.value;
  editTimeDialogVisible.value = false
}

const editDateDialogVisible: Ref<boolean> = ref(false)
function showEditDateDialog() {
  editDateStyle.value = dateTimeConfigService.dateStyle.value
  editDateDialogVisible.value = !editDateDialogVisible.value
}

function saveDateConfig() {
  dateTimeConfigService.dateStyle.value = editDateStyle.value
  editDateDialogVisible.value = false
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

</script>

<template>
  <Card id="dt-card" @contextmenu="openCtxMenu" aria-haspopup="true">
    <template #content>
      <div class="flex flex-column gap-1">
        <div class="time">
          <TimeComponent :time="currentTime" :time-style="dateTimeConfigService.timeStyle.value"
            :hour12="dateTimeConfigService.hour12.value"></TimeComponent>
        </div>
        <div class="date">
          <DateComponent :date="currentTime" :date-style="dateTimeConfigService.dateStyle.value"></DateComponent>
        </div>
      </div>
    </template>
  </Card>

  <!-- Edit Context Menu -->
  <ContextMenu ref="ctxMenu" :model="items" />

  <!-- Time Edit Dialog Box -->
  <Dialog v-model:visible="editTimeDialogVisible" modal header="Edit Time" :style="{ width: '25rem' }"
    :draggable="false">

    <div class="time">
      <TimeComponent :time="currentTime" :time-style="editTimeStyle" :hour12="editHour12">
      </TimeComponent>
    </div>

    <template #footer>
      <div class="w-full flex flex-column gap-3">

        <div class="flex gap-2 align-items-center">
          <Checkbox input-id="cb-h12" v-model="editHour12" binary></Checkbox>
          <label for="cb-h12">Use 12-Hours Format</label>
        </div>

        <div class="flex  gap-3">
          <FloatLabel class="flex-1" variant="in">
            <Select input-id="select-time-edit" v-model="editTimeStyle" :options="editValues" optionLabel="name"
              option-value="code" fluid autofocus></Select>
            <label for="select-time-edit">Select Time Format</label>
          </FloatLabel>

          <Button label="Save" icon="pi pi-check" iconPos="right" @click="saveTimeConfig"></Button>
        </div>
      </div>
    </template>
  </Dialog>

  <!-- Dadte Edit Dialog Box -->
  <Dialog v-model:visible="editDateDialogVisible" modal header="Edit Date" :style="{ width: '25rem' }"
    :draggable="false">

    <div class="date">
      <DateComponent :date="currentTime" :date-style="editDateStyle"></DateComponent>
    </div>

    <template #footer>
      <div class="flex gap-3 w-full">
        <FloatLabel class="flex-1" variant="in">
          <Select input-id="select-date-edit" v-model="editDateStyle" :options="editValues" optionLabel="name"
            option-value="code" fluid autofocus></Select>
          <label for="select-date-edit">Select Date Format</label>
        </FloatLabel>
        <Button label="Save" icon="pi pi-check" iconPos="right" @click="saveDateConfig"></Button>
      </div>
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
#dt-card {
  width: fit-content;
  cursor: default;
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
  color: var(--p-surface-400);
}
</style>
