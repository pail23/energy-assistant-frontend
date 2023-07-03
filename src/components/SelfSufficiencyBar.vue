<template>
  <div class="w-full">
    <progress
      class="progress-primary progress w-full bg-secondary"
      :value="selfSufficiency"
      max="100"
    ></progress>
    <div class="grid w-full grid-cols-3 text-sm">
      <div>
        <span class="mdi mdi-solar-power text-primary"></span>
        <span class="text-primary">{{
          formatNumberWithUnit(consumedSolarEnergy, unit)
        }}</span>
      </div>
      <div class="place-self-center">
        <span>{{ selfSufficiency.toFixed(0) }}%</span>
      </div>
      <div>
        <span class="float-right text-secondary"
          >{{ formatNumberWithUnit(consumed_grid_energy, unit)
          }}<span class="mdi mdi-transmission-tower"></span
        ></span>
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
