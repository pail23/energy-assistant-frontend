<template>
  <div class="w-full">
    <progress
      class="progress-primary progress w-full bg-secondary"
      :value="self_sufficiency"
      max="100"
    ></progress>
    <div class="grid w-full grid-cols-3 text-sm">
      <div>
        <span class="mdi mdi-solar-power text-primary"></span>
        <span class="text-primary"
          >{{ consumed_solar_energy.toFixed(0) }} {{ unit }}</span
        >
      </div>
      <div class="place-self-center">
        <span>{{ self_sufficiency.toFixed(0) }}%</span>
      </div>
      <div>
        <span class="float-right text-secondary"
          >{{ consumed_grid_energy.toFixed(0) }} {{ unit
          }}<span class="mdi mdi-transmission-tower"></span
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  self_sufficiency: { type: Number, required: true },
  consumed_solar_energy: { type: Number, required: true },
  consumed_energy: { type: Number, required: true },
  unit: { type: String, default: 'kWh' },
});

const consumed_grid_energy = computed(() => {
  return props.consumed_energy - props.consumed_solar_energy;
});
</script>
