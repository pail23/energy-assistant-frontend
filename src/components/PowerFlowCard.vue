<template>
  <v-card class="m-4 w-80 sm:w-96 p-4 rounded-lg elevation-6">
    <v-card-text>
      <div class="relative mx-auto h-72 w-80">
        <svg class="h-full w-full" viewBox="0 0 200 180">
          <path
            id="solar-to-home"
            stroke-width="1"
            stroke-dasharray="2,2"
            d="M 115 65 L 145 115"
            class="stroke-sun"
            marker-end="url(#SvgjsMarker1005)"
          />
          <circle v-if="isVisible(solar_to_home_power)" r="2" class="fill-sun">
            <animateMotion
              :dur="solar_to_home_speed"
              repeatCount="indefinite"
              calcMode="linear"
            >
              <mpath xlink:href="#solar-to-home" />
            </animateMotion>
          </circle>
          <path
            id="solar-to-grid"
            stroke-width="1"
            stroke-dasharray="2,2"
            d="M 85 65 L 55 115"
            class="stroke-sun"
            marker-end="url(#SvgjsMarker1006)"
          />
          <circle v-if="isVisible(solar_to_grid_power)" r="2" class="fill-sun">
            <animateMotion
              :dur="solar_to_grid_speed"
              repeatCount="indefinite"
              calcMode="linear"
            >
              <mpath xlink:href="#solar-to-grid" />
            </animateMotion>
          </circle>
          <path
            id="grid-to-home"
            stroke-width="1"
            stroke-dasharray="2,2"
            d="M 70 140 L 130 140"
            class="stroke-grid"
            marker-end="url(#SvgjsMarker1007)"
          />
          <circle v-if="isVisible(grid_to_home_power)" r="2" class="fill-grid">
            <animateMotion
              :dur="grid_to_home_speed"
              repeatCount="indefinite"
              calcMode="linear"
            >
              <mpath xlink:href="#grid-to-home" />
            </animateMotion>
          </circle>

          <defs>
            <marker
              id="SvgjsMarker1005"
              markerWidth="5"
              markerHeight="5"
              refX="2.5"
              refY="2.5"
              viewBox="0 0 5 5"
              orient="auto"
            >
              <polygon
                points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
                class="fill-sun"
              ></polygon>
            </marker>
            <marker
              id="SvgjsMarker1006"
              markerWidth="5"
              markerHeight="5"
              refX="2.5"
              refY="2.5"
              viewBox="0 0 5 5"
              orient="auto"
            >
              <polygon
                points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
                class="fill-sun"
              ></polygon>
            </marker>
            <marker
              id="SvgjsMarker1007"
              markerWidth="5"
              markerHeight="5"
              refX="2.5"
              refY="2.5"
              viewBox="0 0 5 5"
              orient="auto"
            >
              <polygon
                points="0,5 1.6666666666666667,2.5 0,0 5,2.5"
                class="fill-grid"
              ></polygon>
            </marker>
          </defs>
        </svg>
        <div class="absolute bottom-0 left-0 right-0 top-0">
          <div
            class="absolute left-1/2 top-5 grid h-20 w-20 -translate-x-1/2 transform place-items-center rounded-full bg-surface text-center ring-2 ring-yellow-500"
          >
            <div>
              <div class="mdi mdi-solar-power text-2xl text-sun"></div>
              <span class="text-xs">{{
                formatNumberWithUnit(solarPower, unit)
              }}</span>
            </div>
          </div>
          <div
            class="absolute bottom-5 left-5 grid h-20 w-20 place-items-center rounded-full bg-surface text-center ring-2 ring-sky-800"
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
                  {{
                    formatNumberWithUnit(-grid_consumption_power, unit)
                  }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="absolute bottom-5 right-5 grid h-20 w-20 place-items-center rounded-full bg-surface text-center ring-2 ring-blue-800"
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
    </v-card-text>
  </v-card>
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

const norm_speed = 5000;

const props = defineProps<Props>();

const grid_consumption_power = computed(() => {
  return props.homeConsumptionPower - props.solarPower;
});

const solar_to_home_power = computed(() => {
  return props.solarPower > props.homeConsumptionPower
    ? props.homeConsumptionPower
    : props.solarPower;
});

function calculateSpeed(value: number): string {
  if (props.unit == 'W') {
    return norm_speed / value + 's';
  } else {
    return '1.5s';
  }
}

const isVisible = (value: number) => {
  if (props.unit == 'W') {
    return value > 0;
  } else {
    return true;
  }
};

const solar_to_home_speed = computed(() => {
  return calculateSpeed(solar_to_home_power.value);
});

const solar_to_grid_power = computed(() => {
  const result = props.solarPower - props.homeConsumptionPower;
  return result > 0 ? result : 0;
});

const solar_to_grid_speed = computed(() => {
  return calculateSpeed(solar_to_grid_power.value);
});

const grid_to_home_power = computed(() => {
  const grid_power = props.homeConsumptionPower - props.solarPower;
  return grid_power > 0 ? grid_power : 0;
});

const grid_to_home_speed = computed(() => {
  return calculateSpeed(grid_to_home_power.value);
});
</script>

<style scoped>
.fill-sun {
  fill: rgb(var(--v-theme-sun));
}

.fill-grid {
  fill: rgb(var(--v-theme-grid));
}

.stroke-sun {
  stroke: rgb(var(--v-theme-sun));
}

.stroke-grid {
  stroke: rgb(var(--v-theme-grid));
}
</style>
