<template>
  <div class="card m-4 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div>
      <div class="grid w-full">
        <div>
          <span class="mdi pr-2 text-3xl" :class="icon"></span>
          <span class="text-left text-lg font-bold">{{
            measurement.name
          }}</span>
        </div>

        <div class="items-center">
          <div class="italic">{{ t('consumption') }}</div>
          <SelfSufficiencyBar
            :self_sufficiency="self_sufficiency"
            :consumed_energy="measurement.consumed_energy"
            :consumed_solar_energy="measurement.solar_consumed_energy"
          ></SelfSufficiencyBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';
import { IDeviceMeasurementDifference } from '@/api/measurement.api.ts';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  icon: string;
  measurement: IDeviceMeasurementDifference;
}

const props = defineProps<Props>();

const self_sufficiency = computed(() => {
  return props.measurement.consumed_energy != 0
    ? props.measurement.solar_consumed_energy /
        props.measurement.consumed_energy
    : 0.0;
});
</script>
