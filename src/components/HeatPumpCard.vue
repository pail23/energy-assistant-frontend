<template>
  <div class="card m-4 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div>
      <div class="grid w-full">
        <div>
          <span class="mdi pr-2 text-3xl" :class="device.icon"></span>
          <span class="text-left text-lg font-bold">{{ device.name }}</span>
        </div>

        <div class="col-span-6 mt-2 items-center rounded-md bg-base-200 p-2">
          <div class="text-left">
            {{ t('temperature') }}
            <span class="float-right"
              >{{ formatNumberWithUnit(actualTemperature, '°C') }}
            </span>
          </div>
          <div class="text-left">
            {{ t('state') }} <span class="float-right">{{ state }}</span>
          </div>
        </div>
        <div class="col-span-6 mt-2 items-center rounded-md bg-base-200 p-2">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';
import { IEnergy } from '../api/device';
import { IDeviceInfo } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t } = useI18n();

interface Props {
  device: IDeviceInfo;
  power: number;

  today: IEnergy;
  actualTemperature: number;
  state: string;
}

defineProps<Props>();
</script>
