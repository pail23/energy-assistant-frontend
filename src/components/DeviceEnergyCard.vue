<template>
  <v-card class="m-4 w-80 sm:w-96 p-4 rounded-lg">
    <v-card-title>
      <span class="mdi pr-2" :class="device.icon"></span>
      <span class="">{{ device.name }}</span>
    </v-card-title>
    <v-card-text>
      <div class="mt-2 items-center rounded-md bg-base-200 p-2">
        <div class="text-left">
          {{ t('consumption') }}
          <span class="float-right">{{
            formatNumberWithUnit(measurement.consumed_energy, 'kWh')
          }}</span>
        </div>
        <SelfSufficiencyBar :self-sufficiency="selfSufficiency" :consumed-energy="measurement.consumed_energy"
          :consumed-solar-energy="measurement.solar_consumed_energy"></SelfSufficiencyBar>
      </div>
      <div v-if="timeframe == 'week' || timeframe == 'month'" class="mt-2 items-center rounded-md bg-base-200 p-2">
        <Bar :data="chartData" :options="options" />
      </div>
    </v-card-text>
  </v-card>

</template>

<script lang="ts" setup>
import { computed } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';

import {
  IDeviceInfo,
  IDeviceMeasurementPeriod,
  IHomeMeasurementDate,
} from '@/api/energyAssistant.api';
import { formatNumberWithUnit } from '@/utils';
import { useI18n } from 'vue-i18n';

const { t, d } = useI18n();

interface Props {
  measurement: IDeviceMeasurementPeriod;
  device: IDeviceInfo;
  statistics?: IHomeMeasurementDate[];
  timeframe: string;
}

const props = defineProps<Props>();

const selfSufficiency = computed(() => {
  return props.measurement.consumed_energy != 0
    ? (100 * props.measurement.solar_consumed_energy) /
    props.measurement.consumed_energy
    : 0.0;
});

const chartData = computed(() => {
  if (props.statistics) {
    return {
      labels: props.statistics.map((measurement) =>
        d(new Date(measurement.measurement_date), {
          month: 'numeric',
          day: 'numeric',
        }),
      ),
      datasets: [
        {
          label: 'Consumption',
          backgroundColor: '#2563eb',
          data: props.statistics.map((measurement) => {
            const device_measurement = measurement.device_measurements.find(
              (device) => device.device_id == props.device.id,
            );
            return device_measurement
              ? device_measurement.consumed_energy
              : 0.0;
          }),
        },
      ],
    };
  } else {
    return {
      labels: [],
      datasets: [],
    };
  }
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
  },
};
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);
</script>
