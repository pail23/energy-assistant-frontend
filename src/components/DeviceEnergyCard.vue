<template>
  <div class="card m-4 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div>
      <div class="grid w-full">
        <div>
          <span class="mdi pr-2 text-3xl" :class="device.icon"></span>
          <span class="text-left text-lg font-bold">{{ device.name }}</span>
        </div>

        <div class="items-center">
          <div class="italic">{{ t('consumption') }}</div>
          <SelfSufficiencyBar
            :self-sufficiency="self_sufficiency"
            :consumed-energy="measurement.consumed_energy"
            :consumed-solar-energy="measurement.solar_consumed_energy"
          ></SelfSufficiencyBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';
import {
  IDeviceInfo,
  IDeviceMeasurementDifference,
} from '@/api/energyAssistant.api';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  measurement: IDeviceMeasurementDifference;
  device: IDeviceInfo;
}

const props = defineProps<Props>();

const self_sufficiency = computed(() => {
  return props.measurement.consumed_energy != 0
    ? props.measurement.solar_consumed_energy /
        props.measurement.consumed_energy
    : 0.0;
});
</script>
