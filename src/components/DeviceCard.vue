<template>
  <v-card class="pa-4 elevation-2 ma-4 w-80 rounded-md sm:w-96">
    <v-card-title>
      <span class="mdi pr-2" :class="device.icon" />
      <span class="">{{ device.name }}</span>
    </v-card-title>
    <v-card-text>
      <div class="grid w-full grid-cols-1">
        <div
          v-if="available && attributes && Object.entries(attributes).length > 0"
          class="pa-2 bg-subgroup mt-2 items-center rounded-md"
        >
          <div v-for="(attribute, index) in Object.entries(attributes)" :key="index" class="text-left">
            {{ $t('device_attribute.' + attribute[0]) }}
            <span class="float-right">{{ getAttributeValue(attribute[0], attribute[1]) }}</span>
          </div>
        </div>
        <div v-if="!available" class="pa-2 bg-error mt-2 rounded-md text-center">
          {{ $t('unavailable') }}
        </div>
        <div class="pa-2 bg-subgroup mt-2 items-center rounded-md">
          <div v-if="available" class="text-left">
            {{ $t('consumption') }}
            <span class="float-right">{{ formatNumberWithUnit(power, 'W') }}</span>
          </div>
          <SelfSufficiencyBar
            :self-sufficiency="today.self_sufficiency"
            :consumed-energy="today.consumed_energy"
            :consumed-solar-energy="today.consumed_solar_energy"
          />
        </div>
      </div>
      <PowerModeSelection
        :device-id="device.id"
        :supported-power-modes="device.supported_power_modes"
        :power-mode="device.power_mode"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';
import PowerModeSelection from './PowerModeSelection.vue';
import { IEnergy } from '@/api/device';
import { IDeviceInfo } from '@/api/energyAssistant.api';
import { formatDuration, formatNumberWithUnit } from '@/utils';
import { $t } from '@/plugins/i18n';

interface Props {
  device: IDeviceInfo;
  available: boolean;
  power: number;
  today: IEnergy;
  attributes?: object;
}

defineProps<Props>();

function getAttributeValue(name: string, value): string {
  switch (name) {
    case 'session_time':
      return formatDuration(value);
    case 'session_energy':
    case 'session_solar_energy':
      return formatNumberWithUnit(parseFloat(value), 'kWh');
  }
  return value;
}
</script>
