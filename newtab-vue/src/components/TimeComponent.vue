<script setup lang="ts">
import type { Hour12Type, TimeStyleType } from '@/types/DateTimeFormatOptionTypes';
import { computed } from 'vue';

export type TimeComponentPropType = {
    time: Date;
    timeStyle?: TimeStyleType;
    hour12?: Hour12Type;
};

const props = defineProps<TimeComponentPropType>()

const formattedTime = computed(() => {
    return props.time.toLocaleTimeString('en-IN', {
        timeStyle: props.timeStyle ?? undefined,
        hour12: props.hour12 ?? undefined,
    })
})
</script>

<template>
    {{ formattedTime }}
</template>