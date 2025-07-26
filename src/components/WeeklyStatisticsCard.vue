<template>
  <v-card class="elevation-2 ma-4 pa-4 w-80 rounded-md sm:w-96">
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
