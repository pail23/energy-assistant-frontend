<template>
  <div class="card m-4 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div>
      <div class="grid w-full">
        <div>
          <span class="mdi pr-2 text-3xl" :class="device.icon"></span>
          <span class="text-left text-lg font-bold">{{ device.name }}</span>
        </div>

        <div class="mt-2 items-center rounded-md bg-base-200 p-2">
          <div class="text-left">
            {{ t('consumption') }}
            <span class="float-right">{{
              formatNumberWithUnit(measurement.consumed_energy, 'kWh')
            }}</span>
          </div>
          <SelfSufficiencyBar
            :self-sufficiency="selfSufficiency"
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
import { formatNumberWithUnit } from '@/utils';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  measurement: IDeviceMeasurementDifference;
  device: IDeviceInfo;
}

const props = defineProps<Props>();

const selfSufficiency = computed(() => {
  return props.measurement.consumed_energy != 0
    ? (100 * props.measurement.solar_consumed_energy) /
        props.measurement.consumed_energy
    : 0.0;
});
</script>
