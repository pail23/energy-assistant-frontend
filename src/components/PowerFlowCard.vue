<template>
  <div class="card m-4 w-80 bg-base-100 shadow-xl sm:w-96">
    <div class="relative mx-auto h-72 w-80">
      <svg class="h-full w-full" viewBox="0 0 200 180">
        <path
          id="solar-to-home"
          d="M 100 40 L 160 140"
          class="stroke-yellow-500"
        />
        <circle r="2" class="fill-yellow-500">
          <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
            <mpath xlink:href="#solar-to-home" />
          </animateMotion>
        </circle>
        <path
          id="solar-to-grid"
          d="M 100 40 L 40 140"
          class="stroke-purple-500"
        />
        <circle r="2" class="fill-purple-800">
          <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
            <mpath xlink:href="#solar-to-grid" />
          </animateMotion>
        </circle>
        <path id="grid-to-home" d="M 40 140 L 160 140" class="stroke-sky-500" />
        <circle r="2" class="fill-sky-800">
          <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
            <mpath xlink:href="#grid-to-home" />
          </animateMotion>
        </circle>
      </svg>
      <div class="absolute bottom-0 left-0 right-0 top-0">
        <div
          class="absolute left-1/2 top-5 grid h-20 w-20 -translate-x-1/2 transform place-items-center rounded-full bg-base-100 text-center ring-2 ring-yellow-500"
        >
          <div>
            <div class="mdi mdi-solar-power text-2xl text-yellow-500"></div>
            <span class="text-xs">{{
              formatNumberWithUnit(solarPower, unit)
            }}</span>
          </div>
        </div>
        <div
          class="absolute bottom-5 left-5 grid h-20 w-20 place-items-center rounded-full bg-base-100 text-center ring-2 ring-sky-800"
        >
          <div>
            <div class="mdi mdi-transmission-tower text-2xl"></div>

            <div v-if="gridImportedEnergy" class="text-xs">
              <div>
                <span class="mdi mdi-arrow-right"></span>
                {{ formatNumberWithUnit(gridImportedEnergy, unit) }}
              </div>
              <div v-if="gridExportedEnergy">
                <span class="mdi mdi-arrow-left"></span>
                {{ formatNumberWithUnit(gridExportedEnergy, unit) }}
              </div>
            </div>
            <div v-else class="text-xs">
              <span v-if="grid_consumption_power > 0"
                ><span class="mdi mdi-arrow-right"></span>
                {{ formatNumberWithUnit(grid_consumption_power, unit) }}</span
              >
              <span v-else
                ><span class="mdi mdi-arrow-left"></span>
                {{ formatNumberWithUnit(-grid_consumption_power, unit) }}</span
              >
            </div>
          </div>
        </div>
        <div
          class="absolute bottom-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-base-100 text-center ring-2 ring-blue-800"
        >
          <div>
            <div class="mdi mdi-home text-2xl"></div>
            <span class="text-xs">{{
              formatNumberWithUnit(homeConsumptionPower, unit)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { formatNumberWithUnit } from '@/utils';

interface Props {
  solarPower: number;
  homeConsumptionPower: number;
  gridImportedEnergy?: number;
  gridExportedEnergy?: number;
  unit: string;
}

const props = defineProps<Props>();

const grid_consumption_power = computed(() => {
  return props.homeConsumptionPower - props.solarPower;
});
</script>
