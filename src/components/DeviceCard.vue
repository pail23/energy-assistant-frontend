<template>
  <v-card class="m-4 w-80 sm:w-96 p-4 rounded-lg elevation-6">
    <v-card-title>
      <span class="mdi pr-2" :class="device.icon"></span>
      <span class="">{{ device.name }}</span>
    </v-card-title>
    <v-card-text>
      <div class="grid w-full grid-cols-1">
        <div
          v-if="attributes && Object.entries(attributes).length > 0"
          class="mt-2 items-center rounded-md bg-subgroup p-2"
        >
          <div
            v-for="(attribute, index) in Object.entries(attributes)"
            :key="index"
            class="text-left"
          >
            {{ t('device_attribute.' + attribute[0]) }}
            <span class="float-right">{{ attribute[1] }}</span>
          </div>
        </div>
        <div class="mt-2 items-center rounded-md bg-subgroup p-2">
          <div class="text-left">
            {{ t('consumption') }}
            <span class="float-right">{{
              formatNumberWithUnit(power, 'W')
            }}</span>
          </div>
          <SelfSufficiencyBar
            :self-sufficiency="today.self_sufficiency"
            :consumed-energy="today.consumed_energy"
            :consumed-solar-energy="today.consumed_solar_energy"
          ></SelfSufficiencyBar>
        </div>
      </div>
      <PowerModeSelection
        :device-id="device.id"
        :supported-power-modes="device.supported_power_modes"
        :power-mode="device.power_mode"
      ></PowerModeSelection>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';
import PowerModeSelection from './PowerModeSelection.vue';
import { IEnergy } from '@/api/device';
import { IDeviceInfo } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t } = useI18n();

interface Props {
  device: IDeviceInfo;
  power: number;
  today: IEnergy;
  attributes?: object;
}

defineProps<Props>();
</script>
