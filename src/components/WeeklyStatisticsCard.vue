<template>
  <v-card class="rounded-md elevation-2 ma-4 w-80 pa-4 sm:w-96">
    <v-card-text class="w-auto h-100">
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
