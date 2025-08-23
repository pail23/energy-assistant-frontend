<template>
  <v-card class="pa-4 elevation-2 ma-4 card-fixed-width">
    <v-card-title>
      <span class="mdi pr-2" :class="device.icon" />
      <span class="">{{ device.name }}</span>
    </v-card-title>
    <v-card-text>
      <v-container class="pa-0">
        <v-row no-gutters>
          <v-col
            v-if="available && attributes && Object.entries(attributes).length > 0"
            class="bg-subgroup pa-2 mb-2"
          >
            <div v-for="(attribute, index) in Object.entries(attributes)" :key="index" class="text-left w-100">
              {{ $t('device_attribute.' + attribute[0]) }}
              <span class="float-right">{{ getAttributeValue(attribute[0], attribute[1]) }}</span>
            </div>
          </v-col>
          <v-col v-if="!available" class="pa-2 bg-error text-center">
            {{ $t('unavailable') }}
          </v-col>
        </v-row>
        <v-row v-if="available" class="text-left bg-subgroup" no-gutters>
          <v-col class="pa-2">
            {{ $t('consumption') }}
            <span class="float-right">{{ formatNumberWithUnit(power, 'W') }}</span>
          </v-col>
        </v-row>
        <v-row class="bg-subgroup" no-gutters>
          <v-col class="pa-2">
            <SelfSufficiencyBar
              :self-sufficiency="today.self_sufficiency"
              :consumed-energy="today.consumed_energy"
              :consumed-solar-energy="today.consumed_solar_energy"
            />
          </v-col>
        </v-row>
      </v-container>
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
import type { IEnergy, IDeviceInfo } from '@/api/types';
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
