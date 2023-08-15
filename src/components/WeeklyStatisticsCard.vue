<template>
  <v-card class="m-4 w-80 sm:w-96 p-4 rounded-lg">
    <v-card-text class="h-100 w-auto">
      <WeeklyStatistics :data="data" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { IHomeMeasurementDate } from '@/api/energyAssistant.api';
import WeeklyStatistics from './WeeklyStatistics.vue';

interface Props {
  data: IHomeMeasurementDate[];
}

defineProps<Props>();
</script>
