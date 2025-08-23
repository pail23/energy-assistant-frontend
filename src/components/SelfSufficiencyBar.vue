<template>
  <div class="w-100">
    <v-progress-linear color="sun" bg-color="grid" height="15" rounded :model-value="selfSufficiency" />
    <v-row class="text-body-2">
      <v-col cols="4" class="text-sun">
        <span class="mdi mdi-solar-power" />
        <span>{{ formatNumberWithUnit(consumedSolarEnergy, unit) }}</span>
      </v-col>
      <v-col cols="4" class="text-center">
        <span>{{ selfSufficiency.toFixed(0) }}%</span>
      </v-col>
      <v-col cols="4" class="text-right">
        <span class="text-grid"
          >{{ formatNumberWithUnit(consumed_grid_energy, unit) }}<span class="mdi mdi-transmission-tower"
        /></span>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatNumberWithUnit } from '@/utils';

const props = defineProps({
  selfSufficiency: { type: Number, required: true },
  consumedSolarEnergy: { type: Number, required: true },
  consumedEnergy: { type: Number, required: true },
  unit: { type: String, default: 'kWh' },
});

const consumed_grid_energy = computed(() => {
  return props.consumedEnergy - props.consumedSolarEnergy;
});
</script>
