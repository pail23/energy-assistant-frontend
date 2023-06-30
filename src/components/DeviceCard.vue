<template>
  <div class="card m-4 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div>
      <div class="grid w-full grid-cols-1">
        <div>
          <span class="mdi pr-2 text-3xl" :class="device.icon"></span>
          <span class="text-left text-lg font-bold">{{ device.name }}</span>
        </div>
        <div class="items-center">
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
import { IEnergy } from '@/api/device';
import { IDeviceInfo } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t } = useI18n();

interface Props {
  device: IDeviceInfo;
  power: number;
  today: IEnergy;
}

defineProps<Props>();
</script>
