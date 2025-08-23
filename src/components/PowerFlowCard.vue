<template>
  <v-card class="elevation-2 ma-4 pa-4 card-fixed-width">
    <v-card-text>
      <div class="power-flow-container">
        <svg class="h-100 w-100" viewBox="0 0 200 180">
          <path
            id="solar-to-home"
            stroke-width="1"
            stroke-dasharray="2,2"
            d="M 115 65 L 145 115"
            class="stroke-sun"
            marker-end="url(#SvgjsMarker1005)"
          />
          <circle v-if="isVisible(solar_to_home_power)" r="2" class="fill-sun">
            <animateMotion :dur="solar_to_home_speed" repeatCount="indefinite" calcMode="linear">
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
            <animateMotion :dur="solar_to_grid_speed" repeatCount="indefinite" calcMode="linear">
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
            <animateMotion :dur="grid_to_home_speed" repeatCount="indefinite" calcMode="linear">
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
              <polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" class="fill-sun" />
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
              <polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" class="fill-sun" />
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
              <polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" class="fill-grid" />
            </marker>
          </defs>
        </svg>
        <div class="power-flow-overlay">
          <div class="solar-element">
            <div>
              <div class="mdi mdi-solar-power text-sun text-h6" />
              <span class="text-caption">{{ formatNumberWithUnit(solarPower, unit) }}</span>
            </div>
          </div>
          <div class="grid-element">
            <div>
              <div class="mdi mdi-transmission-tower text-h6" />

              <div v-if="gridImportedEnergy" class="text-caption">
                <div>
                  <span class="mdi mdi-arrow-right" />
                  {{ formatNumberWithUnit(gridImportedEnergy, unit) }}
                </div>
                <div v-if="gridExportedEnergy">
                  <span class="mdi mdi-arrow-left" />
                  {{ formatNumberWithUnit(gridExportedEnergy, unit) }}
                </div>
              </div>
              <div v-else class="text-caption">
                <span v-if="grid_consumption_power > 0"
                  ><span class="mdi mdi-arrow-right" /> {{ formatNumberWithUnit(grid_consumption_power, unit) }}</span
                >
                <span v-else
                  ><span class="mdi mdi-arrow-left" /> {{ formatNumberWithUnit(-grid_consumption_power, unit) }}</span
                >
              </div>
            </div>
          </div>
          <div class="home-element">
            <div>
              <div class="mdi mdi-home text-h6" />
              <span class="text-caption">{{ formatNumberWithUnit(homeConsumptionPower, unit) }}</span>
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
  return props.solarPower > props.homeConsumptionPower ? props.homeConsumptionPower : props.solarPower;
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

.card-fixed-width {
  width: 320px;
}

@media (min-width: 600px) {
  .card-fixed-width {
    width: 384px;
  }
}

.power-flow-container {
  position: relative;
  margin: 0 auto;
}

.power-flow-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.solar-element {
  position: absolute;
  top: 1.25rem;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  height: 5rem;
  width: 5rem;
  place-items: center;
  border-radius: 50%;
  text-align: center;
  border: 2px solid rgb(234, 179, 8);
  background-color: rgb(var(--v-theme-surface));
}

.grid-element {
  position: absolute;
  bottom: 1.25rem;
  left: 1.25rem;
  display: grid;
  height: 5rem;
  width: 5rem;
  place-items: center;
  border-radius: 50%;
  text-align: center;
  border: 2px solid rgb(7, 89, 133);
  background-color: rgb(var(--v-theme-surface));
}

.home-element {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: grid;
  height: 5rem;
  width: 5rem;
  place-items: center;
  border-radius: 50%;
  text-align: center;
  border: 2px solid rgb(30, 64, 175);
  background-color: rgb(var(--v-theme-surface));
}
</style>
