<template>
  <v-card class="elevation-2 ma-4 pa-4 card-fixed-width">
    <v-card-text class="h-100 w-auto">
      <WeeklyStatistics :data="data" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import type { IHomeMeasurementDate } from '@/api/types';
import WeeklyStatistics from './WeeklyStatistics.vue';

interface Props {
  data: IHomeMeasurementDate[];
}

defineProps<Props>();
</script>

<style scoped>
.card-fixed-width {
  width: 320px;
}

@media (min-width: 600px) {
  .card-fixed-width {
    width: 384px;
  }
}
</style>
