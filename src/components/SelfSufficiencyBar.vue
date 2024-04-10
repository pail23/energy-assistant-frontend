<template>
  <div class="w-full">
    <v-progress-linear
      color="sun"
      bg-color="grid"
      height="15"
      rounded
      :model-value="selfSufficiency"
    />
    <div class="grid w-full grid-cols-3 text-sm">
      <div class="text-sun">
        <span class="mdi mdi-solar-power" />
        <span>{{ formatNumberWithUnit(consumedSolarEnergy, unit) }}</span>
      </div>
      <div class="place-self-center">
        <span>{{ selfSufficiency.toFixed(0) }}%</span>
      </div>
      <div>
        <span class="text-grid float-right">{{ formatNumberWithUnit(consumed_grid_energy, unit) }}<span class="mdi mdi-transmission-tower" /></span>
      </div>
    </div>
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
