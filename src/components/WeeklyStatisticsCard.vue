<template>
  <div class="card m-4 h-80 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <WeeklyStatistics :data="data" />
  </div>
</template>

<script lang="ts" setup>
import { IHomeMeasurementDate } from '@/api/energyAssistant.api';
import WeeklyStatistics from './WeeklyStatistics.vue';

interface Props {
  data: IHomeMeasurementDate[];
}

defineProps<Props>();
</script>
