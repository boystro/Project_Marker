<script setup lang="ts">
import type { DateStyleType } from '@/types/DateTimeFormatOptionTypes';
import { computed } from 'vue';


export type DateComponentPropType = {
    date: Date;
    dateStyle: DateStyleType;
}
const props = defineProps<DateComponentPropType>()

const formattedDate = computed(() => {
    return props.date.toLocaleDateString('en-IN', {
        dateStyle: props.dateStyle,
    })
})
</script>

<template>
    {{ formattedDate }}
</template>